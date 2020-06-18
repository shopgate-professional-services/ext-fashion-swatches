import React, {
  useContext, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { getFullImageSource, ThemeContext, withCurrentProduct } from '@shopgate/engage/core';
import { getProductImageSettings } from '@shopgate/engage/product/helpers';
import connect from './connector';

/**
 * @param {Object} props Props
 * @return {JSX}
 */
const PdpMediaSection = ({ children, products, colorCharacteristicId }) => {
  const { HeroImage: pdpResolutions } = getProductImageSettings();
  const { contexts: { ProductContext } } = useContext(ThemeContext);
  let { characteristics } = useContext(ProductContext);
  const [bg, setBg] = useState(null);

  characteristics = characteristics || {};

  useEffect(() => {
    if (!products || !colorCharacteristicId || !characteristics[colorCharacteristicId]) {
      return;
    }

    const {
      featuredImageBaseUrl,
    } = products.find(p => (
      p.featuredImageBaseUrl
      && p.characteristics[colorCharacteristicId] === characteristics[colorCharacteristicId]
    )) || {};

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
  }, [characteristics, products, pdpResolutions, colorCharacteristicId]);

  if (!products || !characteristics || !colorCharacteristicId) {
    return children;
  }

  const filteredChars = Object.keys(characteristics).filter(key => !!characteristics[key]);
  // Compare to first product chars length
  const ready = filteredChars.length === Object.keys(products[0].characteristics).length;

  const wrapper = bg && css({
    label: 'media-wrapper',
    ' > div:first-child > div:first-child': {
      backgroundImage: `url(${bg}) !important`,
    },
    // Hide slider(image) until full characteristics selection
    ' > div:first-child > div:first-child > div': {
      transition: 'visibility 0s 1s',
      visibility: ready ? 'visible' : 'hidden',
    },
  }).toString();

  return React.cloneElement(children, {
    ...children.props,
    className: children.props.className ? `${children.props.className.toString()} ${wrapper}` : wrapper,
  }, children.props.children);
};

PdpMediaSection.propTypes = {
  children: PropTypes.node.isRequired,
  colorCharacteristicId: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.shape()),
};

PdpMediaSection.defaultProps = {
  products: null,
  colorCharacteristicId: null,
};

export default withCurrentProduct(connect(PdpMediaSection));
