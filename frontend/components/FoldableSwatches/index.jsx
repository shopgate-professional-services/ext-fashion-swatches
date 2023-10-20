import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import classnames from 'classnames';
import Swatch from '../Swatch';
import Unfolded from './components/Unfolded';
import { swatchColorStyle, swatchSizeStyle } from '../../config';

const { pdp: colorStyle } = swatchColorStyle;
const { pdp: sizeStyle } = swatchSizeStyle;

const styles = {
  swatches: css({
    margin: 20,
    display: 'flex',
  }),
  swatch: css({
    marginRight: 15,
  }).toString(),
  selected: css({
    boxShadow: '0px 0px 0px 2px rgba(0,0,0,0.7)',
  }).toString(),
  disabled: css({
    opacity: 0.1,
  }).toString(),
};

/**
 * @param {Object} props Props
 * @return {JSX}
 */
const FoldableSwatches = ({
  values, onClick, requireSelection, defaultValue, label, isTablet,
}) => {
  const [isFolded, setIsFolded] = useState(!isTablet);

  // Receive props
  useEffect(() => setIsFolded((wasFolded) => {
    if (wasFolded && requireSelection) {
      return false;
    }
    return wasFolded;
  }), [requireSelection]);

  const unfoldedClick = useCallback((value) => {
    onClick(value);
    if (!isTablet) {
      setIsFolded(true);
    }
  }, [onClick, isTablet]);

  if (!values || !values.length) {
    return null;
  }

  if (isFolded) {
    const selection = values.find(v => v.selected);
    const hasSelection = !!selection;
    const selectedValue = selection || defaultValue || values[0];

    return (
      <Swatch
        style={{
          ...selectedValue.swatchColor && {
            background: selectedValue.swatchColor,
            ...colorStyle.default,
            ...hasSelection && colorStyle.selected,
          },
          ...selectedValue.swatchLabel && {
            ...sizeStyle.default,
            ...hasSelection && sizeStyle.selected,
          },
        }}
        className={classnames(styles.swatch, {
          [styles.selected]: hasSelection,
        })}
        onClick={() => setIsFolded(false)}
      >
        {selectedValue.swatchLabel}
      </Swatch>
    );
  }

  return (
    <Unfolded
      onClick={unfoldedClick}
      values={values}
      highlight={requireSelection}
      label={label}
      isTablet={isTablet}
    />
  );
};

FoldableSwatches.propTypes = {
  isTablet: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  defaultValue: PropTypes.shape(),
  label: PropTypes.string,
  requireSelection: PropTypes.bool,
  values: PropTypes.arrayOf(PropTypes.shape()),
};

FoldableSwatches.defaultProps = {
  requireSelection: false,
  label: null,
  values: null,
  defaultValue: null,
};

export default FoldableSwatches;
