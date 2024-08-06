import React, {
  useState, useEffect, useRef, useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import { bin2hex } from '@shopgate/engage/core';
import Transition from 'react-transition-group/Transition';
import { css } from 'glamor';
import classnames from 'classnames';
import { ConditionalWrapper, Link } from '@shopgate/engage/components';
import Swatch from '../../../Swatch';
import { transitions } from '../../../styles';
import {
  swatchColorStyle,
  swatchSizeStyle,
  swatchLinkStyle,
  pdpSwatchesDisplayMode,
  pdpSwatchesPosition,
  linkSwatchConfiguration,
} from '../../../../config';

const { pdp: colorStyle = {} } = swatchColorStyle;
const { pdp: sizeStyle = {} } = swatchSizeStyle;
const { pdp: linkStyle = {} } = swatchLinkStyle;
const { historyReplace } = linkSwatchConfiguration;

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
    justifyContent: pdpSwatchesPosition === 'variants' ? 'center' : 'start',
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
    boxShadow: '0px 0px 0px 1px rgba(0,0,0,0.7)',
  }).toString(),
  selectedTablet: css({
    border: '1px solid #000',
  }).toString(),
  swatch: css({
    '&&': {
      height: 25,
      width: 25,
      marginRight: 10,
      marginLeft: 10,
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
    opacity: 0.2,
  }).toString(),
  disabledTablet: css({
    opacity: 0.4,
  }).toString(),
  swatchesContainer: css({
    marginBottom: 20,
  }).toString(),
  linkSwatch: css({
    width: 'unset',
    textAlign: 'center',
  }).toString(),
  swatchHeadline: css({
    marginBottom: 5,
    textAlign: 'center',
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
  return (yiq >= 220) ? lightContrast : darkContrast;
};

/**
 * @param {Object} props Props
 * @return {JSX}
 */
const FoldableSwatchesUnfolded = ({
  values, onClick, highlight, label, isTablet, isLinkSwatch, showAdditionalText,
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
    if (ulRef.current && !isTablet && pdpSwatchesPosition === 'variants' && highlighted) {
      let selected = values.findIndex(v => !!v.selected);
      if (selected === -1) {
        // Scroll to unselected and highlited element and postion it in center o the view
        selected = values.length - 1;
        ulRef.current.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        });
      }
    }
  }, [values, label, isTablet, highlighted]);

  if (isLinkSwatch) {
    return (
      <Transition
        in={highlighted}
        timeout={1500}
        onEntered={() => setHighlighted(false)}
      >
        {state => (
          <div className={styles.swatchesContainer}>
            {label && pdpSwatchesDisplayMode === 'headline' && pdpSwatchesPosition === 'variants' && (
              <p className={styles.swatchHeadline}>{label}</p>
            )}
            <ul
              className={classnames(
                styles.swatches,
                transitions[state],
                transitions[fade],
                {
                  [styles.swatchesTablet]: isTablet,
                }
              )}
            >
              {label && (pdpSwatchesDisplayMode !== 'headline' || pdpSwatchesPosition !== 'variants') && (
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
                  <Link
                    href={`/item/${bin2hex(value.itemNumber)}`}
                    className={styles.linkSwatch}
                    replace={historyReplace}
                  >
                    <Swatch
                      tagName="li"
                      style={{
                        ...value.swatchColor && {
                          background: value.swatchColor,
                          ...linkStyle.default,
                          ...value.selected && linkStyle.selected,
                          ...!value.selectable && linkStyle.disabled,
                          ...(value.selected ? {
                            boxShadow: '0px 0px 0px 1px #000',
                            border: isTablet ? '4px solid' : '3px solid',
                            borderColor: '#fff',
                          } : null),
                        },
                        ...value.swatchImage && {
                          background: `url(${value.swatchImage})`,
                          height: 70,
                          width: 70,
                          color: '#fff',
                          ...linkStyle.default,
                          ...value.selected && linkStyle.selected,
                          ...!value.selectable && linkStyle.disabled,
                          ...(value.selected ? {
                            boxShadow: '0px 0px 0px 1px #000',
                            border: isTablet ? '4px solid' : '3px solid',
                            borderColor: '#fff',
                          } : null),
                        },
                        ...value.swatchLabel && {
                          ...linkStyle.default,
                          ...value.selected && linkStyle.selected,
                          ...!value.selectable && linkStyle.disabled,
                          ...(value.selected && isTablet ? { boxShadow: '0px 0px 0px 2px #000' } : null),
                        },
                      }}
                      className={classnames({
                        [styles.selected]: value.selected && !isTablet,
                        [styles.selectedTablet]: value.selected && isTablet,
                        [styles.disabled]: !value.selectable,
                        [styles.disabledTablet]: isTablet && !value.selectable,
                      }, styles.swatch, isTablet && styles.swatchTablet)}
                      onClick={() => onClick(value)}
                    >
                      {value.swatchLabel}
                    </Swatch>
                    {showAdditionalText && (
                    <p style={{ fontSize: '0.7rem' }}>{value.additionalText}</p>
                    )}
                  </Link>
                ))}
              </ConditionalWrapper>
            </ul>
          </div>
        )}
      </Transition>
    );
  }

  return (
    <Transition
      in={highlighted}
      timeout={1500}
      onEntered={() => setHighlighted(false)}
    >
      {state => (
        <div className={styles.swatchesContainer}>
          {label && pdpSwatchesDisplayMode === 'headline' && pdpSwatchesPosition === 'variants' && (
            <p className={styles.swatchHeadline}>{label}</p>
          )}
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
            {label && (pdpSwatchesDisplayMode !== 'headline' || pdpSwatchesPosition !== 'variants') && (
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
                    },
                  }}
                  className={classnames({
                    [styles.selected]: value.selected && !isTablet,
                    [styles.selectedTablet]: value.selected && isTablet,
                    [styles.disabled]: !value.selectable,
                    [styles.disabledTablet]: isTablet && !value.selectable,
                  }, styles.swatch, isTablet && styles.swatchTablet)}
                  onClick={() => onClick(value)}
                >
                  {value.swatchLabel}
                </Swatch>
              ))}
            </ConditionalWrapper>
          </ul>
        </div>
      )}
    </Transition>
  );
};

FoldableSwatchesUnfolded.propTypes = {
  onClick: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  highlight: PropTypes.bool,
  isLinkSwatch: PropTypes.bool,
  isTablet: PropTypes.bool,
  label: PropTypes.string,
  showAdditionalText: PropTypes.bool,
};

FoldableSwatchesUnfolded.defaultProps = {
  highlight: false,
  isLinkSwatch: false,
  isTablet: false,
  label: null,
  showAdditionalText: false,
};

export default FoldableSwatchesUnfolded;
