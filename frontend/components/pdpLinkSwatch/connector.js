import { connect } from 'react-redux';
import {
  getIsTablet,
  getLinkSwatch,
} from '../../variants/selectors';

/**
 * @param {Object} state state
 * @param {Object} props props
 * @returns {Object}
 */
const mapStateToProps = (state, { productId }) => ({
  isTablet: getIsTablet(state),
  linkSwatch: getLinkSwatch(state, { productId }),
});

export default connect(mapStateToProps);
