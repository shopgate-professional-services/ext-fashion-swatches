import { css } from 'glamor';
import { swatchColorStyle } from '../../config';

const { plp = {} } = swatchColorStyle;

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
  borderRadius: '100%',
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
