import { connect } from 'react-redux';
import { getProductVariantsProductsData } from '../../variants/selectors';

/**
 * @param {Object} state state
 * @param {Object} props props
 * @returns {Object}
 */
const mapStateToProps = (state, { productId }) => ({
  products: getProductVariantsProductsData(state, { productId }),
});

export default connect(mapStateToProps);
