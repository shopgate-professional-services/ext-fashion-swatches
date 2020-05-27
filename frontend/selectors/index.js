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

    const swatches = JSON.parse(additionalProperties[propertyWithColors]);

    if (!Array.isArray(swatches)) {
      logger.warn(`property "${propertyWithColors}" has wrong format. Expected json string, got`, additionalProperties[propertyWithColors]);
      return null;
    }

    return JSON.parse(additionalProperties[propertyWithColors]);
  }
);
