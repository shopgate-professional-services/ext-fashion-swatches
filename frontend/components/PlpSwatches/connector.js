import { connect } from 'react-redux';
import { getPlpSwatches } from '../../swatches/selectors';

/**
 * @param {Object} state state
 * @param {Object} props props
 * @returns {Object}
 */
const mapStateToProps = (state, props) => ({
  swatches: getPlpSwatches(state, props),
});

export default connect(mapStateToProps);
