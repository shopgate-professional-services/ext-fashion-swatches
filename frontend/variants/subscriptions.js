import omit from 'lodash.omit';
import { appDidStart$, shouldFetchData } from '@shopgate/engage/core';
import { fetchProductVariants } from '@shopgate/engage/product';
import receiveProductVariants from '@shopgate/pwa-common-commerce/product/action-creators/receiveProductVariants';
import { sizeAttributes, colorAttributes } from './config';
import { receiveSwatchesVariants } from './action-creators';
import { getColorSwatch, getSizeSwatch, getSwatchCharacteristicIds } from './helpers';

/**
 * Subscriptions
 * @param {Function} subscribe subscribe
 */
export default (subscribe) => {
  const swatchProperties = [];
  if (sizeAttributes) {
    swatchProperties.push(...sizeAttributes);
  }
  if (colorAttributes) {
    swatchProperties.push(...colorAttributes);
  }

  if (swatchProperties.length) {
    // Only if property is set
    subscribe(appDidStart$, async () => {
      fetchProductVariants.replace(productId => (dispatch, getState) => {
        const state = getState();
        const cachedData = state.product.variantsByProductId[productId];
        if (!shouldFetchData(cachedData)) {
          return Promise.resolve(null);
        }

        dispatch(fetchProductVariants.original(productId))
          .then((result) => {
            const colorSwatch = getColorSwatch(result);
            const sizeSwatch = getSizeSwatch(result);

            const charIds = getSwatchCharacteristicIds(colorSwatch, sizeSwatch);

            if (!charIds) {
              dispatch(receiveProductVariants(productId, result));
              return;
            }

            dispatch(receiveProductVariants(productId, {
              ...result,
              characteristics: result.characteristics.filter(char => (
                !charIds.includes(char.id)
              )),
              products: result.products.map(product => ({
                ...product,
                characteristics: omit(product.characteristics || {}, ...charIds),
              })),
            }));

            dispatch(receiveSwatchesVariants(productId, {
              ...result,
              characteristics: result.characteristics.filter(char => (
                charIds.includes(char.id)
              )),
            }));
          });
      });
    });
  }
};
