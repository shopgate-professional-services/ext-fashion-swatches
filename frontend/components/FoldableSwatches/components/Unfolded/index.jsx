import React, {
  useState, useEffect, useRef, useLayoutEffect,
} from 'react';
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
    padding: '5px 0 4px 0',
    paddingLeft: 2,
    opacity: 0,
    transition: 'opacity 1.5s',
    boxShadow: 'none !important',
    ' li': {
      marginRight: 20,
    },
  }).toString(),
  swatchesTablet: css({
    flexWrap: 'wrap',
    gap: '8px 0',
    paddingBottom: 16,
  }).toString(),
  withLabel: css({
    width: 'calc(100% - 16px)',
  }).toString(),
  selected: css({
    boxShadow: '0px 0px 0px 2px rgba(0,0,0,0.7)',
  }).toString(),
  selectedTablet: css({
    border: '2px solid #fff',
  }).toString(),
  swatch: css({
    '&&': {
      height: 35,
      width: 35,
      marginRight: 20,
    },
  }).toString(),
  swatchTablet: css({
    '&&': {
      height: 45,
      width: 45,
      marginRight: 20,
      fontSize: 16,
    },
  }).toString(),
  labelSwatch: css({
    '&&': {
      width: 'auto',
      padding: '0 12px',
      fontWeight: 600,
      borderRadius: '28px',
    },
  }).toString(),
  labelSwatchTablet: css({
    '&&': {
      padding: '0 20px',
    },
  }).toString(),
  disabled: css({
    opacity: 0.1,
  }).toString(),
};

/**
 * @param {Object} props Props
 * @return {JSX}
 */
const FoldableSwatchesUnfolded = ({
  values, onClick, highlight, label, isTablet,
}) => {
  const [highlighted, setHighlighted] = useState(false);
  const [fade, setFade] = useState('');
  const ulRef = useRef(null);

  useEffect(() => {
    if (highlight) {
      setHighlighted(true);
    }
  }, [highlight]);

  useEffect(() => {
    setFade('fadeIn');
  }, []);

  useLayoutEffect(() => {
    if (ulRef.current) {
      let selected = values.findIndex(v => !!v.selected);
      if (selected === -1 && !label) {
        // Scroll to most right without label and selection
        selected = values.length - 1;
      }
      ulRef.current.scrollLeft = (selected + 1) * 55;
    }
  }, [values, label]);

  return (
    <Transition
      in={highlighted}
      timeout={500}
      onEntered={() => setHighlighted(false)}
    >
      {state => (
        <ul
          className={classnames(
            styles.swatches,
            transitions[state],
            transitions[fade],
            {
              [styles.swatchesTablet]: isTablet,
            }
          )}
          ref={ulRef}
        >
          {label && (
            <Swatch
              key="label"
              style={sizeStyle.default}
              className={classnames(
                styles.swatch,
                isTablet && styles.swatchTablet,
                styles.labelSwatch,
                isTablet && styles.labelSwatchTablet
              )}
            >
              {label}
            </Swatch>
          )}
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
                  ...(value.selected && isTablet ? { boxShadow: `0px 0px 0px 2px ${value.color}` } : null),
                },
                ...value.swatchLabel && {
                  ...sizeStyle.default,
                  ...value.selected && sizeStyle.selected,
                  ...!value.selectable && sizeStyle.disabled,
                  ...(value.selected && isTablet ? { boxShadow: '0px 0px 0px 2px #000' } : null),
                },
              }}
              className={classnames({
                [styles.selected]: value.selected && !isTablet,
                [styles.selectedTablet]: value.selected && isTablet,
                [styles.disabled]: !value.selectable,
              }, styles.swatch, isTablet && styles.swatchTablet)}
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
  isTablet: PropTypes.bool,
  label: PropTypes.string,
};

FoldableSwatchesUnfolded.defaultProps = {
  highlight: false,
  isTablet: false,
  label: null,
};

export default FoldableSwatchesUnfolded;
