import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import classnames from 'classnames';
import { themeConfig } from '@shopgate/engage';

const styles = {
  default: css({
    width: 44,
    height: 44,
    textAlign: 'center',
    borderRadius: '100%',
    flexShrink: 0,
    background: themeConfig.colors.light,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    lineHeight: '1',
    boxShadow: '2px 1px 5px rgba(0, 0, 0, 0.25)',
  }).toString(),
};

/**
 * @param {Object} props Props
 * @return {JSX}
 */
const Swatch = ({
  tagName: Tag, className, style, children, onClick, ariaSelected,
}) => (
  <Tag
    style={style}
    className={classnames(
      styles.default,
      className
    )}
    {...onClick && { onClick }}
    onClick={onClick}
    tabIndex={onClick ? 0 : undefined}
    role={onClick ? 'button' : undefined}
    aria-pressed={ariaSelected}
  >
    {children}
  </Tag>
);

Swatch.propTypes = {
  ariaSelected: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.shape(),
  tagName: PropTypes.string,
};

Swatch.defaultProps = {
  children: null,
  ariaSelected: false,
  className: null,
  onClick: null,
  style: null,
  tagName: 'div',
};

export default Swatch;
