import { sizeProperty } from '../config';

/**
 * Convert Size,Shoe size , Grosse into [Size,Shoe size,Grosse]
 */
export const sizeProperties = sizeProperty
  ? sizeProperty
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
  : null;
