import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import connect from './connector';
import PdpSizeSwatch from '../PdpSizeSwatch';
/**
 * @param {Object} props Props
 * @return {JSX}
 */
const PdpSizeSwatches = ({ swatches, products, getDeviceInformation }) => {
  if (!swatches) {
    return null;
  }
  const isTablet = getDeviceInformation.type === 'tablet';

  return (
    <Fragment>
      {swatches.map((swatch, i) => (
        <PdpSizeSwatch
          key={swatch.id}
          swatch={swatch}
          products={products}
          siblingSizeIds={i === 0
            ? swatches.filter(sw => sw.id !== swatch.id).map(sw => sw.id)
            : null
          }
          isTablet={isTablet}
        />
      ))}
    </Fragment>
  );
};

PdpSizeSwatches.propTypes = {
  getDeviceInformation: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()),
  swatches: PropTypes.arrayOf(PropTypes.shape()),
};

PdpSizeSwatches.defaultProps = {
  products: null,
  swatches: null,
};

export default connect(PdpSizeSwatches);
