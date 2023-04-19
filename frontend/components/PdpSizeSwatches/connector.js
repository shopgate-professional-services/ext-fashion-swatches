import { connect } from 'react-redux';
import { getDeviceInformation } from '@shopgate/pwa-common/selectors/client';
import { getProductVariantsProducts, getSizeCharacteristics } from '../../variants/selectors';
/**
 * @param {Object} state state
 * @param {Object} props props
 * @returns {Object}
 */
const mapStateToProps = (state, { productId }) => ({
  swatches: getSizeCharacteristics(state, { productId }),
  products: getProductVariantsProducts(state, { productId }),
  getDeviceInformation: getDeviceInformation(state),
});

export default connect(mapStateToProps);
