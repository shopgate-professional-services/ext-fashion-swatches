import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { css } from 'glamor';
import classnames from 'classnames';
import Swatch from '../../../Swatch';
import { transitions } from '../../../styles';
import { swatchColorStyle, swatchSizeStyle } from '../../../../config';

const { pdp: colorStyle = {} } = swatchColorStyle;
const { pdp: sizeStyle = {} } = swatchSizeStyle;

const styles = {
  swatches: css({
    overflowScrolling: 'touch',
    WebkitOverflowScrolling: 'touch',
    overflow: 'scroll',
    maxWidth: '100%',
    display: 'flex',
    ' li': {
      marginRight: 12,
    },
    ' li:last-child': {
      marginRight: 15,
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
  const ulRef = useRef(null);

  useEffect(() => {
    if (highlight) {
      setHighlighted(true);
      if (ulRef.current) {
        ulRef.current.scrollLeft = 999;
      }
    }
  }, [highlight]);

  return (
    <Transition
      in={highlighted}
      timeout={500}
      onEntered={() => setHighlighted(false)}
    >
      {state => (
        <ul className={`${styles.swatches} ${transitions[state]}`} ref={ulRef}>
          {values.map(value => (
            <Swatch
              key={value.id}
              tagName="li"
              style={{
                ...value.swatchColor && {
                  background: value.swatchColor,
                  ...colorStyle.default,
                  ...value.selected && colorStyle.selected,
                  ...!value.selectable && colorStyle.disabled,
                },
                ...value.swatchLabel && {
                  ...sizeStyle.default,
                  ...value.selected && sizeStyle.selected,
                  ...!value.selectable && sizeStyle.disabled,
                },
              }}
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
      )}
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
