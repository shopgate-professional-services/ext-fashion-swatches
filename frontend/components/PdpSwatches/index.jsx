import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext, withCurrentProduct } from '@shopgate/engage/core';
import { useNavigateToVariant } from '../../variants/hook';
import PdpColorSwatch from '../PdpColorSwatch';
import PdpSizeSwatch from '../PdpSizeSwatch';
import connect from './connector';

/**
 * @param {Object} props Props
 * @return {JSX}
 */
const PdpSwatches = ({ swatchCharacteristicIds, products }) => {
  const { contexts: { ProductContext } } = useContext(ThemeContext);
  const pdpContext = useContext(ProductContext);

  const { variantId, characteristics } = pdpContext;

  useNavigateToVariant(products, swatchCharacteristicIds);

  const prodContext = useMemo(() => {
    if (variantId) {
      const missingChars = swatchCharacteristicIds.filter(char => (
        !characteristics || !characteristics[char]
      ));

      // Route was updated to variant, but context does not have chars
      if (missingChars.length === 0) {
        const product = products.find(p => p.id === variantId);
        return {
          ...pdpContext,
          characteristics: {
            ...characteristics,
            ...product.characteristics,
          },
        };
      }
    }
    return pdpContext;
  }, [products, pdpContext, variantId, characteristics, swatchCharacteristicIds]);

  return (
    <ProductContext.Provider value={prodContext}>
      <PdpColorSwatch productId={pdpContext.productId} />
      <PdpSizeSwatch productId={pdpContext.productId} />
    </ProductContext.Provider>
  );
};

PdpSwatches.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape()),
  swatchCharacteristicIds: PropTypes.arrayOf(PropTypes.string),
};

PdpSwatches.defaultProps = {
  products: null,
  swatchCharacteristicIds: null,
};

export default withCurrentProduct(connect(PdpSwatches));
