import { sizeAttribute, colorAttribute } from '../config';

/**
 * Convert csv string into string[]
 */
export const sizeAttributes = sizeAttribute
  ? [].concat(sizeAttribute)
    .map(s => s.trim())
    .filter(Boolean)
  : null;

/**
 * Convert csv string into string[]
 */
export const colorAttributes = colorAttribute
  ? [].concat(colorAttribute)
    .map(s => s.trim())
    .filter(Boolean)
  : null;
