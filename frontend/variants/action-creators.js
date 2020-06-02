import { RECEIVE_SWATCHES_VARIANTS } from './constants';

/**
 * @param {string} productId .
 * @param {Object[]} variants .
 * @return {Object}
 */
export const receiveSwatchesVariants = (productId, variants) => ({
  type: RECEIVE_SWATCHES_VARIANTS,
  productId,
  variants,
});
