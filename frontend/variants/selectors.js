import { createSelector } from 'reselect';
import { getProducts } from '@shopgate/engage/product';
import { getColorSwatch, getSizeSwatches, getSwatchCharacteristicIds as getIds } from './helpers';

/**
 * @param {Object} state .
 * @return {Object}
 */
const getState = (state) => {
  if (!state.extensions['@shopgate-project/fashion-swatches/variants']) {
    return {};
  }
  return state.extensions['@shopgate-project/fashion-swatches/variants'];
};

/**
 * @returns {null|Object[]}
 */
export const getProductVariants = createSelector(
  getState,
  (_, { productId }) => productId,
  (state, productId) => state[productId] || null
);

/**
 * @returns {null|Object[]}
 */
export const getProductVariantsProducts = createSelector(
  getProductVariants,
  variants => variants && variants.products
);

/**
 * @returns {null|Object[]}
 */
export const getProductVariantsProductsData = createSelector(
  getProductVariantsProducts,
  getProducts,
  (products, productsState) => {
    if (!products || !productsState) {
      return null;
    }

    return products
      .map(p => ({
        ...p,
        featuredImageBaseUrl: productsState[p.id]
          && productsState[p.id].productData
          && productsState[p.id].productData.featuredImageBaseUrl,
      }));
  }
);

/**
 * @returns {null|Object[]}
 */
export const getSizeCharacteristics = createSelector(
  getProductVariants,
  variants => getSizeSwatches(variants)
);

/**
 * @returns {null|Object[]}
 */
export const getColorCharacteristic = createSelector(
  getProductVariants,
  variants => getColorSwatch(variants)
);

/**
 * @returns {null|Object[]}
 */
export const getSwatchCharacteristicIds = createSelector(
  getColorCharacteristic,
  getSizeCharacteristics,
  (one, two) => getIds(one, ...two)
);
