import React from 'react';
import PropTypes from 'prop-types';
import connect from './connector';
import styles from './style';
import { maxSwatches } from '../../config';

/**
 * @param {Object} props Props
 * @param {Array} props.swatches Props Array of product swatches
 * @return {JSX}
 */
const PlpSwatches = ({ swatches }) => {
  if (!swatches || !swatches.length) {
    return null;
  }

  if (swatches.length > maxSwatches && maxSwatches !== 0) {
    return (
      <div>
        <ul className={styles.list}>
          {swatches.slice(0, maxSwatches).map(swatch => (
            <li
              className={styles.listItem}
              key={swatch}
            >
              <div className={styles.swatch(swatch)} />
            </li>
          ))}
          <li>
            <div className={`fashion-swatches max-swatches plus ${styles.plus}`}>
             +
            </div>
          </li>
          <li>
            <div className={`fashion-swatches max-swatches number ${styles.maxSwatches}`}>
              {`${swatches.length - maxSwatches}`}
            </div>
          </li>
        </ul>
      </div>
    );
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
