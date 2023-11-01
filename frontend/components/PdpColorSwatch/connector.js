import { connect } from 'react-redux';
import {
  getColorCharacteristic,
  getProductVariantsProducts,
  getSwatchCharacteristicIds,
  getIsTablet,
} from '../../variants/selectors';
/**
 * @param {Object} state state
 * @param {Object} props props
 * @returns {Object}
 */
const mapStateToProps = (state, { productId }) => ({
  swatch: getColorCharacteristic(state, { productId }),
  swatchCharacteristicIds: getSwatchCharacteristicIds(state, { productId }),
  products: getProductVariantsProducts(state, { productId }),
  isTablet: getIsTablet(state),
});

export default connect(mapStateToProps);
