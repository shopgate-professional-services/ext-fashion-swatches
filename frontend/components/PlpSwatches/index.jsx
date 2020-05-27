import React from 'react';
import PropTypes from 'prop-types';
import connect from './connector';
import styles from './style';

/**
 * @param {Object} props Props
 * @param {Array} props.swatches Props Array of product swatches
 * @return {JSX}
 */
const PlpSwatches = ({ swatches }) => {
  if (!swatches || !swatches.length) {
    return null;
  }

  return (
    <div>
      <ul className={styles.list}>
        {swatches.map(swatch => (
          <li
            className={styles.listItem}
            key={swatch}
          >
            <div className={styles.swatch(swatch)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

PlpSwatches.propTypes = {
  swatches: PropTypes.arrayOf(PropTypes.string),
};

PlpSwatches.defaultProps = {
  swatches: [],
};

export default connect(PlpSwatches);
