import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { Grid } from '@shopgate/engage/components';
import Swatch from '../../../../../Swatch';
import { swatchSizeStyle } from '../../../../../../config';

const { pdp: sizeStyle = {} } = swatchSizeStyle;

const styles = {
  grid: css({
    width: '100%',
  }).toString(),
  labelItem: css({
    margin: '5px 16px 4px 16px',
  }).toString(),
  swatches: css({
    overflowX: 'scroll',
  }).toString(),
  swatch: css({
    '&&': {
      height: 35,
      width: 'auto',
      padding: '0 12px',
      fontWeight: 600,
      borderRadius: '18px',
    },
  }).toString(),
};

/**
 * @param {Object} props Props
 * @return {JSX}
 */
const LabeledWrapper = ({ label, children }) => (
  <Grid className={styles.grid}>
    <Grid.Item shrink={0} grow={0} className={styles.labelItem}>
      <Swatch
        style={sizeStyle.default}
        className={styles.swatch}
      >
        {label}
      </Swatch>
    </Grid.Item>
    <Grid.Item grow={1} className={styles.swatches}>
      {children}
    </Grid.Item>
  </Grid>
);

LabeledWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
};

export default LabeledWrapper;
