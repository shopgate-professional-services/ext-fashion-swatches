import { createSelector } from 'reselect';
import { getProductDataById } from '@shopgate/engage/product';
import { logger } from '@shopgate/pwa-core';
import { propertyWithColors } from '../config';

export const getPlpSwatches = createSelector(
  getProductDataById,
  (productData) => {
    const { additionalProperties = {} } = productData || {};

    if (!additionalProperties[propertyWithColors]) {
      return null;
    }

    let swatches = null;
    try {
      swatches = JSON.parse(additionalProperties[propertyWithColors]);
    } catch (e) {
      logger.warn(`JSON.parse error while parsing "${propertyWithColors}".`, additionalProperties[propertyWithColors], e);
      return null;
    }

    if (!Array.isArray(swatches)) {
      logger.warn(`property "${propertyWithColors}" has wrong format. Expected array as json string, got`, additionalProperties[propertyWithColors]);
      return null;
    }

    return swatches;
  }
);
