import { appDidStart$, shouldFetchData } from '@shopgate/engage/core';
import { fetchProductVariants } from '@shopgate/engage/product';
import receiveProductVariants from '@shopgate/pwa-common-commerce/product/action-creators/receiveProductVariants';
import { sizeProperties } from './config';
import { receiveSwatchesVariants } from './action-creators';

/**
 * Subscriptions
 * @param {Function} subscribe subscribe
 */
export default (subscribe) => {
  const swatchProperties = [];
  if (sizeProperties) {
    swatchProperties.push(...sizeProperties);
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
            dispatch(receiveProductVariants(productId, {
              ...result,
              characteristics: result.characteristics.filter(char => (
                !swatchProperties.includes(char.label)
              )),
            }));
            dispatch(receiveSwatchesVariants(productId, {
              ...result,
              characteristics: result.characteristics.filter(char => (
                swatchProperties.includes(char.label)
              )),
            }));
          });
      });
    });
  }
};
