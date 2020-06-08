import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import classnames from 'classnames';
import { themeConfig } from '@shopgate/engage';

const styles = {
  default: css({
    width: 44,
    height: 44,
    margin: '3px 0',
    borderRadius: '100%',
    flexShrink: 0,
    background: themeConfig.colors.light,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
    lineHeight: '1.4',
    boxShadow: '2px 1px 5px rgba(0, 0, 0, 0.25)',
  }).toString(),
};

/**
 * @param {Object} props Props
 * @return {JSX}
 */
const Swatch = ({
  tagName: Tag, className, style, children, onClick,
}) => (
  <Tag
    style={style}
    className={classnames(
      styles.default,
      className
    )}
    {...onClick && { onClick }}
  >
    {children}
  </Tag>
);

Swatch.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.shape(),
  tagName: PropTypes.string,
};

Swatch.defaultProps = {
  children: null,
  className: null,
  onClick: null,
  style: null,
  tagName: 'div',
};

export default Swatch;
