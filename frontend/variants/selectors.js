import { createSelector } from 'reselect';
import { sizeProperties } from './config';

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
export const getSizeCharacteristic = createSelector(
  getProductVariants,
  (variants) => {
    if (!variants || !sizeProperties) {
      return null;
    }

    return variants.characteristics.filter(char => (
      sizeProperties.includes(char.label)
    ))[0] || null;
  }
);

/**
 * @returns {null|Object[]}
 */
export const getSizeCharacteristicId = createSelector(
  getSizeCharacteristic,
  char => char && char.id
);

