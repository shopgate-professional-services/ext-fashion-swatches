import React, {
  useContext, useMemo, useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { logger, ThemeContext, withCurrentProduct } from '@shopgate/engage/core';
import { useConditioner, useNavigateToVariant, useSwatchValueSelect } from '../../variants/hook';
import connect from './connector';
import FoldableSwatches from '../FoldableSwatches';

// TODO: move to config
const colorCircle = `radial-gradient(circle at 38% 7% ,rgba(255,255,000,1) 20%,rgba(255,255,000,.0) 38%),
    radial-gradient(circle at 50% 0%,rgba(128,255,000,1) 22%,rgba(128,255,000,.0) 48%),
    radial-gradient(circle at 75% 7% ,rgba(000,255,000,1) 22%,rgba(000,255,000,.0) 48%),
    radial-gradient(circle at 93% 24%  ,rgba(000,255,128,1) 22%,rgba(000,255,128,.0) 48%),
    radial-gradient(circle at 100% 50%,rgba(000,255,255,1) 22%,rgba(000,255,255,.0) 48%),
    radial-gradient(circle at 93% 75% ,rgba(000,128,255,1) 22%,rgba(000,128,255,.0) 48%),
    radial-gradient(circle at 75% 93%,rgba(000,000,255,1) 22%,rgba(000,000,255,.0) 48%),
    radial-gradient(circle at 50% 100% ,rgba(128,000,255,1) 22%,rgba(128,000,255,.0) 48%),
    radial-gradient(circle at 25% 93%,rgba(255,000,255,1) 22%,rgba(255,000,255,.0) 48%),
    radial-gradient(circle at 7% 75%,rgba(255,000,128,1) 22%,rgba(255,000,128,.0) 48%),
    radial-gradient(circle at 0% 50%,rgba(255,000,000,1) 22%,rgba(255,000,000,.0) 48%),
    radial-gradient(circle at 7% 25%,rgba(255,128,000,1) 22%,rgba(255,128,000,.0) 48%)`;

/**
 * @param {Object} props Props
 * @return {JSX}
 */
const PdpColorSwatch = ({ swatch, products }) => {
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
  }, -1);

  useNavigateToVariant(products);
  const select = useSwatchValueSelect(swatch);

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
      defaultValue={{ swatchLabel: '', swatchColor: colorCircle }}
    />
  );
};

PdpColorSwatch.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape()),
  swatch: PropTypes.shape(),
};

PdpColorSwatch.defaultProps = {
  products: null,
  swatch: null,
};

export default withCurrentProduct(connect(PdpColorSwatch));
