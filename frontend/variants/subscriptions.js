import omit from 'lodash.omit';
import { appDidStart$, shouldFetchData, main$ } from '@shopgate/engage/core';
import { fetchProductsById, fetchProductVariants, REQUEST_PRODUCT_VARIANTS } from '@shopgate/engage/product'
import receiveProductVariants from '@shopgate/pwa-common-commerce/product/action-creators/receiveProductVariants';
import errorProductVariants from '@shopgate/pwa-common-commerce/product/action-creators/errorProductVariants';
import { sizeAttributes, colorAttributes } from './config';
import { receiveSwatchesVariants } from './action-creators';
import { getColorSwatch, getSizeSwatch, getSwatchCharacteristicIds } from './helpers';
import { SUCCESS_ADD_PRODUCTS_TO_CART } from '@shopgate/pwa-common-commerce/cart/constants'
import { RECEIVE_SWATCHES_VARIANTS } from './constants'

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
    subscribe(appDidStart$, () => {
      fetchProductVariants.replace(productId => async (dispatch, getState) => {
        const state = getState();
        const cachedData = state.product.variantsByProductId[productId];
        if (!shouldFetchData(cachedData)) {
          return Promise.resolve(null);
        }

        let result;
        try {
          result = await fetchProductVariants.original(productId)(
            // Noop dispatch to suppress original data dispatching
            (action) => {
              if (action.type === REQUEST_PRODUCT_VARIANTS) {
                dispatch(action);
              }
            },
            getState
          );
          const colorSwatch = getColorSwatch(result);
          const sizeSwatch = getSizeSwatch(result);

          const charIds = getSwatchCharacteristicIds(colorSwatch, sizeSwatch);

          if (!charIds) {
            dispatch(receiveProductVariants(productId, result));
            return result;
          }

          const characteristics = result.characteristics.filter(char => (
            !charIds.includes(char.id)
          ));

          dispatch(receiveProductVariants(productId, {
            ...result,
            characteristics,
            products: characteristics.length ? result.products.map(product => ({
              ...product,
              characteristics: omit(product.characteristics || {}, ...charIds),
            })) : [],
          }));

          dispatch(receiveSwatchesVariants(productId, {
            ...result,
            characteristics: result.characteristics.filter(char => (
              charIds.includes(char.id)
            )),
          }));
        } catch (error) {
          dispatch(errorProductVariants(productId, error.code));
        }

        return result;
      });
    });

    // 2. Fetch product data for unique variants (first product of each color, etc)
    const fetchVariantData$ = main$.filter(({ action }) => (
      action.type === RECEIVE_SWATCHES_VARIANTS
    ));
    subscribe(fetchVariantData$, ({ dispatch, action }) => {
      const { variants: { characteristics, products } } = action;
      if (!characteristics || !characteristics.length) {
        return;
      }
      const [{ id, values }] = characteristics;
      const productIds = values
        .map(val => val.id)
        .map(valId => products.find(product => product.characteristics[id] === valId))
        .filter(Boolean)
        .map(product => product.id);
      if (productIds.length) {
        dispatch(fetchProductsById(productIds));
      }
    });
  }
};
