import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext, withCurrentProduct } from '@shopgate/engage/core'
import connect from './connector';

/**
 * @param {Object} props Props
 * @return {JSX}
 */
const PdpVariantCharacteristics = ({ children, sizeCharacteristicId }) => {
  const { contexts: { ProductContext } } = useContext(ThemeContext);
  const prodContext = useContext(ProductContext);

  if (!sizeCharacteristicId) {
    return children;
  }

  const {
    [sizeCharacteristicId]: ignore,
    ...restCharacteristics
  } = prodContext.characteristics || {};

  /**
   * Eliminate size selection
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
  sizeCharacteristicId: PropTypes.node,
};

PdpVariantCharacteristics.defaultProps = {
  sizeCharacteristicId: PropTypes.node,
};

export default withCurrentProduct(connect(PdpVariantCharacteristics));
