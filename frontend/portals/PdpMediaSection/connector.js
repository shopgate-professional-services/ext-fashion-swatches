import { connect } from 'react-redux';
import { getProductVariantsProductsData, getColorCharacteristicId } from '../../variants/selectors';

/**
 * @param {Object} state state
 * @param {Object} props props
 * @returns {Object}
 */
const mapStateToProps = (state, { productId }) => ({
  products: getProductVariantsProductsData(state, { productId }),
  colorCharacteristicId: getColorCharacteristicId(state, { productId }),
});

export default connect(mapStateToProps);
