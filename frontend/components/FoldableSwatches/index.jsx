import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import classnames from 'classnames';
import Swatch from '../Swatch';
import Unfolded from './components/Unfolded';

const styles = {
  swatches: css({
    margin: 20,
    display: 'flex',
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
const FoldableSwatches = ({
  values, onClick, requireSelection, defaultValue,
}) => {
  const [isFolded, setIsFolded] = useState(true);

  // Receive props
  useEffect(() => setIsFolded((wasFolded) => {
    if (wasFolded && requireSelection) {
      return false;
    }
    return wasFolded;
  }), [requireSelection]);

  const unfoldedClick = useCallback((value) => {
    onClick(value);
    setIsFolded(true);
  }, [onClick]);

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
          ...selectedValue.swatchColor && { background: selectedValue.swatchColor },
        }}
        className={classnames({
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
    />
  );
};

FoldableSwatches.propTypes = {
  onClick: PropTypes.func.isRequired,
  defaultValue: PropTypes.shape(),
  requireSelection: PropTypes.bool,
  values: PropTypes.arrayOf(PropTypes.shape()),
};

FoldableSwatches.defaultProps = {
  requireSelection: false,
  values: null,
  defaultValue: null,
};

export default FoldableSwatches;
