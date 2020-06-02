import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import classnames from 'classnames';
import { ThemeContext, withCurrentProduct } from '@shopgate/engage/core';
import { ActionButton } from '@shopgate/engage/components';
import { useNavigateToVariant, useConditioner } from '../../variants/hook';
import connect from './connector';

const styles = {
  selected: css({
    border: '2px solid #000',
  }).toString(),
  disabled: css({
    background: '#e4e4e4',
  }).toString(),
};

/**
 * @param {Object} props Props
 * @return {JSX}
 */
const PdpSizeSwatch = ({ swatch, products }) => {
  const { contexts: { ProductContext } } = useContext(ThemeContext);
  const { characteristics, setCharacteristics } = useContext(ProductContext);

  useConditioner('PdpSizeSwatch', () => !!characteristics[swatch.id]);
  useNavigateToVariant(products);

  const values = useMemo(() => {
    if (!swatch || !swatch.values.length) {
      return null;
    }

    return swatch.values.map(value => ({
      ...value,
      selected: characteristics && characteristics[swatch.id] === value.id,
    }));
  }, [swatch, characteristics]);

  if (!values || !values.length) {
    return null;
  }

  return (
    <div style={{ display: 'flex' }}>
      {values.map(value => (
        <ActionButton
          key={value.id}
          onClick={() => setCharacteristics({
            ...characteristics,
            [swatch.id]: value.id,
          })}
          className={classnames({
            [styles.selected]: value.selected,
          })}
        >
          {value.label}
        </ActionButton>
      ))}
    </div>
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
