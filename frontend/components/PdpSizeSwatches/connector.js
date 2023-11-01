import { connect } from 'react-redux';
import {
  getProductVariantsProducts,
  getSizeCharacteristics,
  getIsTablet,
} from '../../variants/selectors';
/**
 * @param {Object} state state
 * @param {Object} props props
 * @returns {Object}
 */
const mapStateToProps = (state, { productId }) => ({
  swatches: getSizeCharacteristics(state, { productId }),
  products: getProductVariantsProducts(state, { productId }),
  isTablet: getIsTablet(state),
});

export default connect(mapStateToProps);
