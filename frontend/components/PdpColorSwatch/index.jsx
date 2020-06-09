import React, {
  useContext, useMemo, useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { logger, ThemeContext, withCurrentProduct } from '@shopgate/engage/core';
import { useConditioner, useNavigateToVariant, useSwatchValueSelect } from '../../variants/hook';
import connect from './connector';
import FoldableSwatches from '../FoldableSwatches';
import { swatchColorUnselectedValue } from '../../config';

/**
 * @param {Object} props Props
 * @return {JSX}
 */
const PdpColorSwatch = ({ swatch, swatchCharacteristicIds, products }) => {
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

  useNavigateToVariant(products, swatchCharacteristicIds);
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
  products: PropTypes.arrayOf(PropTypes.shape()),
  swatch: PropTypes.shape(),
  swatchCharacteristicIds: PropTypes.arrayOf(PropTypes.string),
};

PdpColorSwatch.defaultProps = {
  products: null,
  swatch: null,
  swatchCharacteristicIds: null,
};

export default withCurrentProduct(connect(PdpColorSwatch));
