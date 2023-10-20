import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { ThemeContext, withCurrentProduct } from '@shopgate/engage/core';
import { ConditionalWrapper } from '@shopgate/engage/components';
import { useNavigateToVariant, useRouteCharacteristics } from '../../variants/hook';
import PdpColorSwatch from '../PdpColorSwatch';
import PdpSizeSwatches from '../PdpSizeSwatches';
import connect from './connector';

const styles = {
  containerTablet: css({
    paddingTop: 16,
  }),
};

/**
 * @param {Object} props Props
 * @return {JSX}
 */
const PdpSwatches = ({
  swatchCharacteristicIds, products, name, isTablet,
}) => {
  const { contexts: { ProductContext } } = useContext(ThemeContext);
  const pdpContext = useContext(ProductContext);

  const { variantId, characteristics } = pdpContext;

  useNavigateToVariant(products);
  useRouteCharacteristics();

  const prodContext = useMemo(() => {
    if (!swatchCharacteristicIds) {
      return pdpContext;
    }
    if (variantId) {
      const missingChars = swatchCharacteristicIds.filter(char => (
        !characteristics || !characteristics[char]
      ));

      // Route was updated to variant, but context does not have chars
      if (missingChars.length === swatchCharacteristicIds.length) {
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

  // When the fashion-swatches extension is rendered on tablets, the component needs to render
  // in a different portal than usual.
  if (!swatchCharacteristicIds || (isTablet && name !== 'product.tablet.right-column.after')) {
    return null;
  }

  return (
    <ConditionalWrapper
      condition={isTablet}
      wrapper={children => (
        <div className={styles.containerTablet}>
          {children}
        </div>
      )}
    >
      <ProductContext.Provider value={prodContext}>
        <PdpColorSwatch productId={pdpContext.productId} />
        <PdpSizeSwatches productId={pdpContext.productId} />
      </ProductContext.Provider>
    </ConditionalWrapper>
  );
};

PdpSwatches.propTypes = {
  isTablet: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()),
  swatchCharacteristicIds: PropTypes.arrayOf(PropTypes.string),
};

PdpSwatches.defaultProps = {
  products: null,
  swatchCharacteristicIds: null,
};

export default withCurrentProduct(connect(PdpSwatches));
