import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import { logger, ThemeContext } from '@shopgate/engage/core';
import { useConditioner, useSwatchValueSelect } from '../../variants/hook';
import connect from './connector';
import FoldableSwatches from '../FoldableSwatches';
import { swatchColorUnselectedValue } from '../../config';

/**
 * @param {Object} props Props
 * @return {JSX}
 */
const PdpColorSwatch = ({ swatch, swatchCharacteristicIds }) => {
  const { contexts: { ProductContext } } = useContext(ThemeContext);
  const { characteristics } = useContext(ProductContext);
  const [requireSelection, setRequireSelection] = useState(false);

  useConditioner('PdpColorSwatch', () => {
    if (!swatch) {
      return true;
    }
    const result = Boolean(characteristics && !!characteristics[swatch.id]);
    logger.assert(result, 'PdpColorSwatch is not fulfilled');
    if (!result) {
      setRequireSelection(true);
    }
    return result;
  }, -10);

  const select = useSwatchValueSelect(swatch, swatchCharacteristicIds);

  useEffect(() => {
    if (requireSelection) {
      setTimeout(() => setRequireSelection(false), 500);
    }
  }, [requireSelection]);

  const values = useMemo(() => {
    if (!swatch || !swatch.values.length) {
      return null;
    }

    return swatch.values.map(value => ({
      ...value,
      swatchColor: value.color,
      selected: characteristics && characteristics[swatch.id] === value.id,
      selectable: true,
    }));
  }, [swatch, characteristics]);

  return (
    <FoldableSwatches
      onClick={select}
      values={values}
      requireSelection={requireSelection}
      defaultValue={swatchColorUnselectedValue}
    />
  );
};

PdpColorSwatch.propTypes = {
  swatch: PropTypes.shape(),
  swatchCharacteristicIds: PropTypes.arrayOf(PropTypes.string),
};

PdpColorSwatch.defaultProps = {
  swatch: null,
  swatchCharacteristicIds: null,
};

export default connect(PdpColorSwatch);
