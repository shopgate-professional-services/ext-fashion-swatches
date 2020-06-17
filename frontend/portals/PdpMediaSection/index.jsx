import React, {
  useContext, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import isMatch from 'lodash.ismatch';
import pick from 'lodash.pick';
import { getFullImageSource, ThemeContext, withCurrentProduct } from '@shopgate/engage/core';
import { getProductImageSettings } from '@shopgate/engage/product/helpers';
import connect from './connector';

/**
 * @param {Object} props Props
 * @return {JSX}
 */
const PdpMediaSection = ({ children, products }) => {
  const { HeroImage: pdpResolutions } = getProductImageSettings();
  const { contexts: { ProductContext } } = useContext(ThemeContext);
  const { characteristics } = useContext(ProductContext);
  const [bg, setBg] = useState(null);

  useEffect(() => {
    if (!characteristics || !products) {
      return;
    }
    const filteredChars = Object.keys(characteristics).filter(key => !!characteristics[key]);
    const omitted = pick(characteristics, filteredChars);

    const {
      featuredImageBaseUrl,
    } = products.find(p => p.featuredImageBaseUrl && isMatch(p.characteristics, omitted)) || {};

    if (!featuredImageBaseUrl) {
      return;
    }
    const newBg = getFullImageSource(
      featuredImageBaseUrl,
      pdpResolutions[pdpResolutions.length - 1]
    );
    const image = new window.Image();
    image.onload = () => setBg(newBg);
    image.src = newBg;
  }, [characteristics, products, pdpResolutions]);

  if (!products || !characteristics) {
    return children;
  }

  const filteredChars = Object.keys(characteristics).filter(key => !!characteristics[key]);
  // Compare to first product chars length
  const ready = filteredChars.length === Object.keys(products[0].characteristics).length;

  const wrapper = bg && css({
    label: 'media-wrapper',
    ' > div:first-child': {
      backgroundImage: `url(${bg}) !important`,
    },
    // Hide slider(image) until ful characteristics selection
    ...!ready && {
      ' > div:first-child > div': {
        visibility: 'hidden',
      },
    },
  }).toString();

  return React.cloneElement(children, {
    ...children.props,
    className: children.props.className ? `${children.props.className.toString()} ${wrapper}` : wrapper,
  }, children.props.children);
};

PdpMediaSection.propTypes = {
  children: PropTypes.node.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()),
};

PdpMediaSection.defaultProps = {
  products: null,
};

export default withCurrentProduct(connect(PdpMediaSection));