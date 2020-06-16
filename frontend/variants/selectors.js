import { createSelector } from 'reselect';
import { getColorSwatch, getSizeSwatch, getSwatchCharacteristicIds as getIds } from './helpers';
import { getProductDataById, getProducts } from '@shopgate/pwa-common-commerce/product/selectors/product'

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
export const getSizeCharacteristic = createSelector(
  getProductVariants,
  variants => getSizeSwatch(variants)
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
  getSizeCharacteristic,
  getColorCharacteristic,
  (one, two) => getIds(one, two)
);
