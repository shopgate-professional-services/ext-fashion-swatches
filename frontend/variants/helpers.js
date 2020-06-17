import { propertyWithColor } from '../config';
import { colorAttributes, sizeAttributes } from './config';

/**
 * Extract size swatch from product variants
 * @param {Object} variants .
 * @returns {*|null}
 */
export const getSizeSwatches = (variants) => {
  if (!variants || !sizeAttributes) {
    return null;
  }

  const sizeSwatches = variants.characteristics.filter(char => (
    sizeAttributes.includes(char.label)
  ));

  return sizeSwatches.length ? sizeSwatches : null;
};

/**
 * Extract color swatch from product variants
 * @param {Object} variants .
 * @returns {null|*}
 */
export const getColorSwatch = (variants) => {
  if (!variants || !colorAttributes) {
    return null;
  }

  const colorSwatch = variants.characteristics.find(char => (
    colorAttributes.includes(char.label)
  ));
  if (!colorSwatch) {
    return null;
  }

  // Every swatch value should read propertyWithColor
  colorSwatch.values = colorSwatch.values.map((value) => {
    const { additionalProperties } = variants.products.find(p => (
      p.characteristics[colorSwatch.id] === value.id
    )) || {};
    let property;
    if (additionalProperties) {
      property = additionalProperties.find(p => p.label === propertyWithColor);
    }

    return {
      ...value,
      color: property ? property.value : value.label,
    };
  }).filter(Boolean);

  return colorSwatch;
};

/**
 * @param {Object[]} swatches .
 * @returns {*}
 */
export const getSwatchCharacteristicIds = (...swatches) => {
  const ids = swatches.filter(Boolean).map(s => s.id);
  return ids.length ? ids : null;
};
