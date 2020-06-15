import { connect } from 'react-redux';
import { getSwatchCharacteristicIds } from '../../variants/selectors';

/**
 * @param {Object} state state
 * @param {Object} props props
 * @returns {Object}
 */
const mapStateToProps = (state, { productId }) => ({
  swatchCharacteristicIds: getSwatchCharacteristicIds(state, { productId }),
});

export default connect(mapStateToProps);
