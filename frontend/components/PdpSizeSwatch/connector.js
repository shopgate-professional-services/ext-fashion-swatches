import { connect } from 'react-redux';
import { getProductVariantsProducts, getSizeCharacteristic } from '../../variants/selectors';

/**
 * @param {Object} state state
 * @param {Object} props props
 * @returns {Object}
 */
const mapStateToProps = (state, { productId }) => ({
  swatch: getSizeCharacteristic(state, { productId }),
  products: getProductVariantsProducts(state, { productId }),
});

export default connect(mapStateToProps);