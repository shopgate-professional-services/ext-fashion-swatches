import React, { useContext, useMemo } from 'react';
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

  const contextValue = useMemo(() => {
    if (!swatchCharacteristicIds) {
      return null;
    }

    /**
     * Eliminate (omit) size and color selection
     * Needed for ProductCharacteristics.checkSelection to work properly
     */
    const restCharacteristics = omit(prodContext.characteristics || {}, ...swatchCharacteristicIds);

    return {
      ...prodContext,
      characteristics: prodContext.characteristics && restCharacteristics,
    };
  }, [prodContext, swatchCharacteristicIds]);

  if (!contextValue) {
    return children;
  }

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
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
