import { RECEIVE_SWATCHES_VARIANTS } from './constants';

/**
 * @param {Object} [state={}] The current state.
 * @param {Object} action The action object.
 * @return {Object} The new state.
 */
const variants = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_SWATCHES_VARIANTS:
      return {
        ...state,
        [action.productId]: action.variants,
      };
    default:
      return state;
  }
};

export default variants;
