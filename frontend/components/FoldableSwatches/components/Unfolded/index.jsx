import React, {
  useState, useEffect, useRef, useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { css } from 'glamor';
import classnames from 'classnames';
import { ConditionalWrapper } from '@shopgate/engage/components';
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
    paddingBottom: 16,
  }).toString(),
  swatchesContainerTablet: css({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '16px 0',
  }).toString(),
  withLabel: css({
    width: 'calc(100% - 16px)',
  }).toString(),
  selected: css({
    boxShadow: '0px 0px 0px 2px rgba(0,0,0,0.7)',
  }).toString(),
  selectedTablet: css({
    border: '2px solid #000',
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
      height: 42,
      width: 42,
      marginRight: 16,
      fontSize: 15,
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
 * Checks if a string is a hex color
 * @param {string} hexcolor Input hex color
 * @returns {boolean}
 */
const isHexColor = hexcolor => /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i.test(hexcolor);

/**
 * Retrieves a contrast color for a passed hex color
 * @param {string} hexcolor Input hex color
 * @param {string} lightContrast Color applied when the input color is "light"
 * @param {string} darkContrast Color applied when the input color is "dark"
 * @returns {string}
 */
const getContrastColor = (hexcolor, lightContrast, darkContrast) => {
  if (!isHexColor(hexcolor)) {
    return lightContrast;
  }

  let sanitizedColor = hexcolor;

  // If a leading # is provided, remove it
  if (sanitizedColor.slice(0, 1) === '#') {
    sanitizedColor = sanitizedColor.slice(1);
  }

  // If a three-character hexcode, make six-character
  if (sanitizedColor.length === 3) {
    sanitizedColor = sanitizedColor.split('').map(hex => hex + hex).join('');
  }

  // Convert to RGB value
  const r = parseInt(sanitizedColor.substring(0, 2), 16);
  const g = parseInt(sanitizedColor.substring(2, 4), 16);
  const b = parseInt(sanitizedColor.substring(4, 6), 16);

  // Get YIQ ratio
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

  // Check contrast
  return (yiq >= 230) ? lightContrast : darkContrast;
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
    if (ulRef.current && !isTablet) {
      let selected = values.findIndex(v => !!v.selected);
      if (selected === -1 && !label) {
        // Scroll to most right without label and selection
        selected = values.length - 1;
      }
      ulRef.current.scrollLeft = (selected + 1) * 55;
    }
  }, [values, label, isTablet]);

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
          <ConditionalWrapper
            condition={isTablet}
            wrapper={children => (
              <div className={styles.swatchesContainerTablet}>
                {children}
              </div>
            )}
          >
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
                    ...(value.selected && isTablet ? {
                      boxShadow: `0px 0px 0px 2px ${getContrastColor(value.color, '#525345', value.color)}`,
                      borderColor: '#fff',
                    } : null),
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
          </ConditionalWrapper>
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
