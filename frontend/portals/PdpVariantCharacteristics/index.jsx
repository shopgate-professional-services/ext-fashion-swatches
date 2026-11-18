import React, {
  Children, cloneElement, isValidElement, useContext, useMemo,
} from 'react';
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

  // Every characteristic is rendered as a swatch, so the core variant selector has nothing to
  // select. Since PWA 7.34 the selector receives the conditioner as a prop, and its selection
  // check blocks add to cart for empty variants. It stays mounted without the conditioner;
  // older themes pass no such prop and keep their behaviour.
  const content = hasCoreCharacteristics ? children : Children.map(children, child => (
    isValidElement(child) && Object.prototype.hasOwnProperty.call(child.props, 'conditioner')
      ? cloneElement(child, { conditioner: null })
      : child
  ));

  return (
    <ProductContext.Provider value={contextValue}>
      {content}
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
