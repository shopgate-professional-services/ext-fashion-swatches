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
  values, onClick, folded, highlight,
}) => {
  const [isFolded, setIsFolded] = useState(folded);

  // Receive props
  useEffect(() => setIsFolded(folded), [folded]);

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
    const selectedValue = selection || values[0];

    return (
      <Swatch
        style={{
          ...selectedValue.swatchColor && { background: selectedValue.swatchColor },
          marginTop: 12,
          marginBottom: 12,
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
      highlight={highlight}
    />
  );
};

FoldableSwatches.propTypes = {
  onClick: PropTypes.func.isRequired,
  folded: PropTypes.bool,
  highlight: PropTypes.bool,
  values: PropTypes.arrayOf(PropTypes.shape()),
};

FoldableSwatches.defaultProps = {
  folded: true,
  highlight: false,
  values: null,
};

export default FoldableSwatches;
