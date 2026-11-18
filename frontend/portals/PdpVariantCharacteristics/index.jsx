import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';
import { ThemeContext, withCurrentProduct } from '@shopgate/engage/core';
import connect from './connector';

/**
 * @param {Object} props Props
 * @return {JSX}
 */
const PdpVariantCharacteristics = ({
  children,
  swatchCharacteristicIds,
  hasCoreCharacteristics,
}) => {
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

  if (!hasCoreCharacteristics) {
    // Every characteristic is rendered as a swatch. The core variant selector has nothing to
    // select, and since PWA 7.34 its selection check blocks add to cart for empty variants.
    return null;
  }

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

PdpVariantCharacteristics.propTypes = {
  children: PropTypes.node.isRequired,
  hasCoreCharacteristics: PropTypes.bool,
  swatchCharacteristicIds: PropTypes.node,
};

PdpVariantCharacteristics.defaultProps = {
  hasCoreCharacteristics: true,
  swatchCharacteristicIds: PropTypes.node,
};

export default withCurrentProduct(connect(PdpVariantCharacteristics));
