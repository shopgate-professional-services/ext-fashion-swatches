import { connect } from 'react-redux';
import { getColorCharacteristic, getProductVariantsProducts } from '../../variants/selectors';

/**
 * @param {Object} state state
 * @param {Object} props props
 * @returns {Object}
 */
const mapStateToProps = (state, { productId }) => ({
  swatch: getColorCharacteristic(state, { productId }),
  products: getProductVariantsProducts(state, { productId }),
});

export default connect(mapStateToProps);
