import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import isMatch from 'lodash.ismatch';
import omit from 'lodash.omit';
import { logger, ThemeContext } from '@shopgate/engage/core';
import { useConditioner, useSwatchValueSelect } from '../../variants/hook';
import FoldableSwatches from '../FoldableSwatches';
import { swatchSizeUnselectedValue, swatchLabels } from '../../config';

/**
 * @param {Object} props Props
 * @return {JSX}
 */
const PdpSizeSwatch = ({
  swatch, products, siblingSizeIds, isTablet,
}) => {
  const { contexts: { ProductContext } } = useContext(ThemeContext);
  let { characteristics } = useContext(ProductContext);
  const [requireSelection, setRequireSelection] = useState(false);

  characteristics = characteristics || {};

  useConditioner(`PdpSizeSwatch-${swatch.id}`, () => {
    if (!swatch) {
      return true;
    }
    const result = Boolean(characteristics[swatch.id]);
    logger.assert(result, `PdpSizeSwatch ${swatch.label} is not fulfilled`);
    if (!result) {
      setRequireSelection(true);
    }
    return result;
  }, -9);

  const select = useSwatchValueSelect(swatch, siblingSizeIds, products);

  useEffect(() => {
    if (requireSelection) {
      setTimeout(() => setRequireSelection(false), 500);
    }
  }, [requireSelection]);

  const values = useMemo(() => {
    if (!swatch || !swatch.values.length) {
      return null;
    }

    const charIds = Object.keys(characteristics).filter(charId => !characteristics[charId]);
    const valuable = omit(characteristics, ...charIds, ...siblingSizeIds);

    const { [swatch.id]: ignore, ...selfOmitted } = valuable;

    return swatch.values.map(value => ({
      ...value,
      swatchLabel: value.label,
      selected: characteristics[swatch.id] === value.id,
      selectable: products.some(product => isMatch(product.characteristics, {
        ...selfOmitted,
        [swatch.id]: value.id,
      })),
    }));
  }, [swatch, products, characteristics, siblingSizeIds]);

  let label;
  if (swatchLabels.enabled) {
    if (swatchLabels.labels[swatch.label] !== false) {
      label = swatchLabels.labels[swatch.label] || swatch.label;
    }
  }

  return (
    <FoldableSwatches
      onClick={select}
      values={values}
      requireSelection={requireSelection}
      label={label}
      defaultValue={swatchSizeUnselectedValue[swatch.label]}
      isTablet={isTablet}
    />
  );
};

PdpSizeSwatch.propTypes = {
  isTablet: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  swatch: PropTypes.shape().isRequired,
  siblingSizeIds: PropTypes.arrayOf(PropTypes.string),
};

PdpSizeSwatch.defaultProps = {
  siblingSizeIds: null,
};

export default PdpSizeSwatch;
