import { css } from 'glamor';
import { swatchStylePlp } from '../../config';

const imgSize = 16;

const list = css({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 5,
});

const listItem = css({
  marginRight: 5,
  marginBottom: 10,
  ...swatchStylePlp,
  overflow: 'hidden',
  position: 'relative',
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
