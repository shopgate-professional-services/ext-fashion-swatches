import { connect } from 'react-redux';
import { getDeviceInformation } from '@shopgate/pwa-common/selectors/client';
import {
  getColorCharacteristic,
  getProductVariantsProducts,
  getSwatchCharacteristicIds,
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
  getDeviceInformation: getDeviceInformation(state),
});

export default connect(mapStateToProps);
