import { connect } from 'react-redux';
import { getProductVariants as getCoreProductVariants } from '@shopgate/engage/product';
import { getSwatchCharacteristicIds } from '../../variants/selectors';

/**
 * @param {Object} state state
 * @param {Object} props props
 * @returns {Object}
 */
const mapStateToProps = (state, { productId }) => {
  const coreVariants = getCoreProductVariants(state, { productId });

  return {
    swatchCharacteristicIds: getSwatchCharacteristicIds(state, { productId }),
    // The core variants only keep the characteristics that are not rendered as swatches.
    hasCoreCharacteristics: coreVariants ? coreVariants.characteristics.length > 0 : true,
  };
};

export default connect(mapStateToProps);
