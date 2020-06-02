import { connect } from 'react-redux';
import { getProductVariants } from '@shopgate/engage/product';
import { getSizeCharacteristic } from '../../variants/selectors';

/**
 * @param {Object} state state
 * @param {Object} props props
 * @returns {Object}
 */
const mapStateToProps = (state, { productId }) => {
  const variants = getProductVariants(state, { productId });
  return {
    swatch: getSizeCharacteristic(state, { productId }),
    products: variants && variants.products,
  };
};

export default connect(mapStateToProps);
