import { sizeAttribute, colorAttribute } from '../config';

/**
 * Convert csv string into string[]
 */
export const sizeAttributes = sizeAttribute
  ? sizeAttribute
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
  : null;

/**
 * Convert csv string into string[]
 */
export const colorAttributes = colorAttribute
  ? colorAttribute
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
  : null;
