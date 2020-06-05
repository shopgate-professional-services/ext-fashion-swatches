import React, { useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { logger, ThemeContext, withCurrentProduct } from '@shopgate/engage/core';
import { useConditioner, useNavigateToVariant, useSwatchValueSelect } from '../../variants/hook';
import connect from './connector';
import FoldableSwatches from '../FoldableSwatches';

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
  });
  useNavigateToVariant(products);
  const select = useSwatchValueSelect(swatch);

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
      folded={!requireSelection}
      highlight={!!requireSelection}
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
