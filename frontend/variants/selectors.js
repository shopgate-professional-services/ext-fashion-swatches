import { createSelector } from 'reselect';
import { getColorSwatch, getSizeSwatch, getSwatchCharacteristicIds as getIds } from './helpers';

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
