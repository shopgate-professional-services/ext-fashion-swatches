import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import FoldableSwatches from '../FoldableSwatches';
import connect from './connector';
import { swatchColorUnselectedValue, swatchLabels, linkSwatchConfiguration } from '../../config';

/**
 * @param {Object} props Props
 * @return {JSX}
 */
const PdpLinkSwatch = ({ productId, isTablet, linkSwatch }) => {
  const values = useMemo(() => {
    if (!linkSwatch || !linkSwatch.length) {
      return null;
    }

    const linkSwatchValues = [];

    linkSwatch.map((swatch) => {
      Object.keys(swatch).map((value) => {
        linkSwatchValues.push({
          id: value,
          itemNumber: swatch[value].itemNumber,
          swatchLabel: swatch[value].label,
          swatchColor: swatch[value].hexcode,
          selected: productId === swatch[value].itemNumber,
          selectable: true,
          swatchImage: swatch[value].img,
          additionalText: swatch[value].label,
        });
        return null;
      });
      return null;
    });

    return linkSwatchValues;
  }, [linkSwatch, productId]);

  const [requireSelection, setRequireSelection] = useState(false);

  useEffect(() => {
    if (requireSelection) {
      setTimeout(() => setRequireSelection(false), 500);
    }
  }, [requireSelection]);

  const label = swatchLabels.labels.Link || '';

  /**
   * Pseudo function
   @returns {void}
   */
  const pseudoFunction = () => null;

  return (
    <FoldableSwatches
      onClick={pseudoFunction}
      values={values}
      requireSelection={requireSelection}
      defaultValue={swatchColorUnselectedValue}
      label={swatchLabels.enabled ? label : null}
      isTablet={isTablet}
      isLinkSwatch
      showAdditionalText={linkSwatchConfiguration.showAdditionalText}
    />
  );
};

PdpLinkSwatch.propTypes = {
  isTablet: PropTypes.bool.isRequired,
  linkSwatch: PropTypes.arrayOf(PropTypes.shape()),
  productId: PropTypes.string,
};

PdpLinkSwatch.defaultProps = {
  linkSwatch: {},
  productId: '',
};

export default connect(PdpLinkSwatch);
