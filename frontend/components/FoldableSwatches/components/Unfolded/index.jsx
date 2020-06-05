import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { css } from 'glamor';
import classnames from 'classnames';
import Swatch from '../../../Swatch';
import { transitions } from '../../../styles';

const styles = {
  swatches: css({
    marginTop: 12,
    marginBottom: 12,
    display: 'flex',
    ' li': {
      marginRight: 12,
    },
    ' li:last-child': {
      marginRight: 0,
    },
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
const FoldableSwatchesUnfolded = ({ values, onClick, highlight }) => {
  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    if (highlight) {
      setHighlighted(true);
    }
  }, [highlight]);

  return (
    <Transition
      in={highlighted}
      timeout={500}
      onEntered={() => setHighlighted(false)}
    >
      {state => {
        console.warn('@@@@@', state);
        return (
          <ul style={transitions[state]} className={styles.swatches}>
            {values.map(value => (
              <Swatch
                key={value.id}
                tagName="li"
                style={{ ...value.swatchColor && { background: value.swatchColor } }}
                className={classnames({
                  [styles.selected]: value.selected,
                  [styles.disabled]: !value.selectable,
                })}
                onClick={() => onClick(value)}
              >
                {value.swatchLabel}
              </Swatch>
            ))}
          </ul>
        );
      }}
    </Transition>
  );
};

FoldableSwatchesUnfolded.propTypes = {
  onClick: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  highlight: PropTypes.bool,
};

FoldableSwatchesUnfolded.defaultProps = {
  highlight: false,
};

export default FoldableSwatchesUnfolded;
