import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import classnames from 'classnames';
import isMatch from 'lodash.ismatch';
import { ThemeContext, withCurrentProduct, logger } from '@shopgate/engage/core';
import { useNavigateToVariant, useConditioner } from '../../variants/hook';
import connect from './connector';

const styles = {
  default: css({
    width: 36,
    height: 36,
    borderRadius: '100%',
    marginRight: 8,
    marginBottom: 8,
  }),
  selected: css({
    border: '2px solid #000',
  }).toString(),
  disabled: css({
    opacity: 0.1,
  }).toString(),
};

/**
 * @param {Object} props Props
 * @return {JSX}
 */
const PdpColorSwatch = ({ swatch, products }) => {
  const { contexts: { ProductContext } } = useContext(ThemeContext);
  const { characteristics, setCharacteristics } = useContext(ProductContext);

  useConditioner('PdpColorSwatch', () => {
    if (!swatch) {
      return true;
    }
    const result = Boolean(characteristics && !!characteristics[swatch.id]);
    logger.assert(result, 'PdpColorSwatch is not fulfilled');
    return result;
  });
  useNavigateToVariant(products);

  const values = useMemo(() => {
    if (!swatch || !swatch.values.length) {
      return null;
    }

    return swatch.values.map(value => ({
      ...value,
      selected: characteristics && characteristics[swatch.id] === value.id,
      selectable: true,
    }));
  }, [swatch, characteristics]);

  if (!values || !values.length) {
    return null;
  }

  return (
    <ul style={{ display: 'flex', flexWrap: 'wrap', margin: '20px' }}>
      {values.map(value => (
        <li
          key={value.id}
          style={{ background: value.color }}
          className={classnames({
            [styles.default]: true,
            [styles.selected]: value.selected,
            [styles.disabled]: !value.selectable,
          })}
          onClick={() => value.selectable && setCharacteristics({
            ...characteristics,
            [swatch.id]: value.id,
          })}
        >
        </li>
      ))}
    </ul>
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
