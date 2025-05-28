import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import classnames from 'classnames';
import { themeConfig } from '@shopgate/engage';
import { getProductRoute } from '@shopgate/engage/product';
import { useNavigation } from '@shopgate/engage/core/hooks/useNavigation';
import { linkSwatchConfiguration } from '../../config';

const { historyReplace } = linkSwatchConfiguration;

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
  tagName: Tag,
  itemNumber,
  isLinkSwatch,
  className,
  style,
  children,
  onClick,
  ariaSelected,
  ariaLabel,
  ariaHidden,
  id,
}) => {
  const { push, replace } = useNavigation();

  const handleClick = useCallback((e) => {
    if (isLinkSwatch) {
      // Create item route link
      const link = getProductRoute(itemNumber);
      // Pick history function based on configuration
      const historyFn = historyReplace ? replace : push;
      // Navigate
      historyFn({ pathname: link });
    } else if (typeof onClick === 'function') {
      onClick(e);
    }
  }, [isLinkSwatch, itemNumber, onClick, push, replace]);

  return (
    <Tag
      style={style}
      id={id}
      className={classnames(
        styles.default,
        className,
        'swatch__option'
      )}
      role="option"
      tabIndex={0}
      aria-selected={ariaSelected}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      onClick={handleClick}
    >
      {children}
    </Tag>
  );
};

Swatch.propTypes = {
  ariaHidden: PropTypes.bool,
  ariaLabel: PropTypes.string,
  ariaSelected: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
  isLinkSwatch: PropTypes.bool,
  itemNumber: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.shape(),
  tagName: PropTypes.string,
};

Swatch.defaultProps = {
  children: null,
  ariaSelected: false,
  ariaHidden: false,
  ariaLabel: '',
  className: null,
  id: null,
  onClick: null,
  style: null,
  tagName: 'div',
  isLinkSwatch: false,
  itemNumber: null,
};

export default Swatch;
