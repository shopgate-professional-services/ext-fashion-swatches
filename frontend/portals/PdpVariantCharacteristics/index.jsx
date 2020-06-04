import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';
import { ThemeContext, withCurrentProduct } from '@shopgate/engage/core';
import connect from './connector';

/**
 * @param {Object} props Props
 * @return {JSX}
 */
const PdpVariantCharacteristics = ({ children, swatchCharacteristicIds }) => {
  const { contexts: { ProductContext } } = useContext(ThemeContext);
  const prodContext = useContext(ProductContext);

  if (!swatchCharacteristicIds) {
    return children;
  }

  const restCharacteristics = omit(prodContext.characteristics || {}, ...swatchCharacteristicIds);

  /**
   * Eliminate (omit) size and color selection
   * Needed for ProductCharacteristics.checkSelection to work properly
   */
  return React.cloneElement(
    children,
    {
      ...prodContext,
      characteristics: prodContext.characteristics && restCharacteristics,
    },
    children.props.children
  );
};

PdpVariantCharacteristics.propTypes = {
  children: PropTypes.node.isRequired,
  swatchCharacteristicIds: PropTypes.node,
};

PdpVariantCharacteristics.defaultProps = {
  swatchCharacteristicIds: PropTypes.node,
};

export default withCurrentProduct(connect(PdpVariantCharacteristics));
