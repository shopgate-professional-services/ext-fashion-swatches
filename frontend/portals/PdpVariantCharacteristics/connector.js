import { connect } from 'react-redux';
import { getSizeCharacteristicId } from '../../variants/selectors';

/**
 * @param {Object} state state
 * @param {Object} props props
 * @returns {Object}
 */
const mapStateToProps = (state, { productId }) => ({
  sizeCharacteristicId: getSizeCharacteristicId(state, { productId }),
});

export default connect(mapStateToProps);
