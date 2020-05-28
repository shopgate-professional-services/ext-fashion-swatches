import { css } from 'glamor';
import { swatchStyle } from '../../config';

const { plp = {} } = swatchStyle;

const imgSize = 16;

const list = css({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 5,
});

const listItem = css({
  marginRight: 5,
  marginBottom: 5,
  overflow: 'hidden',
  position: 'relative',
  ...plp,
});

/**
 * @param {string} bg css background
 * @return {Object}
 */
const swatch = bg => css({
  width: imgSize,
  height: imgSize,
  background: bg,
});

export default {
  list,
  listItem,
  swatch,
};
