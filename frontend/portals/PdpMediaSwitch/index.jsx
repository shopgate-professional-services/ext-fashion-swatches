import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '@shopgate/engage/core';
import { withColorVariantsData, withFetchProductImages } from '../../variants/hocs';
import { useIsVariantReady } from '../../variants/hook';

/**
 * @param {Object} props Props
 * @return {JSX}
 */
const PdpMediaSwitch = ({
  children, media, colorCharacteristicId, products, fetchProductImages,
}) => {
  const { contexts: { ProductContext } } = useContext(ThemeContext);
  const { characteristics, variantId } = useContext(ProductContext);
  const [preVariantId, setPreVariantId] = useState(variantId);

  const isVariantReady = useIsVariantReady(products);

  /** Pre-calculate variant ID based on color swatch selection */
  useEffect(() => {
    if (!products
      || !characteristics
      || !colorCharacteristicId
      || isVariantReady
      || !characteristics[colorCharacteristicId]) {
      return;
    }

    // Find the first product with given color swatch
    const { id } = products.find(p => (
      p.characteristics[colorCharacteristicId] === characteristics[colorCharacteristicId]
    ));

    fetchProductImages(id).then(() => {
      // After images are fetched, set pre-calculated variant ID
      setPreVariantId(id);
    });
  }, [
    isVariantReady,
    characteristics,
    colorCharacteristicId,
    products,
    fetchProductImages,
  ]);

  if (!products || isVariantReady) {
    // Return Original Media from PDP as is
    return children({ media });
  }

  return children({
    media: React.cloneElement(media, {
      ...media.props,
      variantId: preVariantId,
    }),
  });
};

PdpMediaSwitch.propTypes = {
  children: PropTypes.func.isRequired,
  fetchProductImages: PropTypes.func.isRequired,
  media: PropTypes.node.isRequired,
  colorCharacteristicId: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.shape()),
};

PdpMediaSwitch.defaultProps = {
  products: null,
  colorCharacteristicId: null,
};

export default withFetchProductImages(withColorVariantsData(PdpMediaSwitch));
