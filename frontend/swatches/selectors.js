import { createSelector } from 'reselect';
import { getProductDataById } from '@shopgate/engage/product';
import { logger } from '@shopgate/pwa-core';
import { propertyWithColors } from '../config';

export const getPlpSwatches = createSelector(
  getProductDataById,
  (productData) => {
    const { additionalProperties } = productData || {};

    if (!additionalProperties) {
      return null;
    }

    const property = additionalProperties.find(p => p.label === propertyWithColors);
    if (!property) {
      return null;
    }

    let swatches = property.value;
    if (typeof property.value === 'string') {
      try {
        swatches = JSON.parse(property.value);
      } catch (e) {
        logger.warn(`JSON.parse error while parsing "${propertyWithColors}".`, property.value, e);
        return null;
      }
    }

    if (!Array.isArray(swatches)) {
      logger.warn(`property "${propertyWithColors}" has wrong format. Expected array as json string, got`, property.value);
      return null;
    }

    return swatches;
  }
);
