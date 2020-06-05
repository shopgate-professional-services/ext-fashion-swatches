import React, { useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import isMatch from 'lodash.ismatch';
import { logger, ThemeContext, withCurrentProduct } from '@shopgate/engage/core';
import { useConditioner, useNavigateToVariant, useSwatchValueSelect } from '../../variants/hook';
import connect from './connector';
import FoldableSwatches from '../FoldableSwatches';

/**
 * @param {Object} props Props
 * @return {JSX}
 */
const PdpSizeSwatch = ({ swatch, products }) => {
  const { contexts: { ProductContext } } = useContext(ThemeContext);
  const { characteristics } = useContext(ProductContext);
  const [requireSelection, setRequireSelection] = useState(false);

  useConditioner('PdpSizeSwatch', () => {
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

    const { [swatch.id]: ignore, ...selfOmitted } = characteristics || {};

    return swatch.values.map(value => ({
      ...value,
      swatchLabel: value.label,
      selected: characteristics && characteristics[swatch.id] === value.id,
      selectable: !characteristics || products.some(product => isMatch(product.characteristics, {
        ...selfOmitted,
        [swatch.id]: value.id,
      })),
    }));
  }, [swatch, products, characteristics]);

  return (
    <FoldableSwatches
      onClick={select}
      values={values}
      folded={!requireSelection}
      highlight={!!requireSelection}
    />
  );
};

PdpSizeSwatch.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape()),
  swatch: PropTypes.shape(),
};

PdpSizeSwatch.defaultProps = {
  products: null,
  swatch: null,
};

export default withCurrentProduct(connect(PdpSizeSwatch));
