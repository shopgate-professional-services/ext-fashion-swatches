import { connect } from 'react-redux';
import {
  getProductVariants,
  getSwatchCharacteristicIds,
  getIsTablet,
} from '../../variants/selectors';

/**
 * @param {Object} state state
 * @param {Object} props props
 * @returns {Object}
 */
const mapStateToProps = (state, { productId }) => ({
  isTablet: getIsTablet(state),
  swatchCharacteristicIds: getSwatchCharacteristicIds(state, { productId }),
  variants: getProductVariants(state, { productId }),
});

export default connect(mapStateToProps);
