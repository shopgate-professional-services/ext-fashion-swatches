import {
  useEffect, useContext, useCallback, useMemo,
} from 'react';
import isMatch from 'lodash.ismatch';
import { router, ThemeContext } from '@shopgate/engage/core';

export const useNavigateToVariant = (products, swatchCharacteristicIds = []) => {
  const { contexts: { ProductContext } } = useContext(ThemeContext);
  const { characteristics, variantId } = useContext(ProductContext);

  /** @see ProductCharacteristics.checkSelectedCharacteristics */
  useEffect(() => {
    if (!products || !characteristics) {
      return;
    }

    const filteredChars = Object.keys(characteristics).filter(key => !!characteristics[key]);
    if (swatchCharacteristicIds.length !== filteredChars.length) {
      return;
    }

    const prs = products.filter(product => (
      isMatch(product.characteristics, characteristics)
    ));

    if (prs.length && prs[0].id !== variantId) {
      const route = router.getCurrentRoute();
      router.update(route.id, { productId: prs[0].id });
    }
  }, [characteristics, variantId, products, swatchCharacteristicIds]);
};

export const useConditioner = (name, condition, priority = 1) => {
  const { contexts: { ProductContext } } = useContext(ThemeContext);
  const { conditioner } = useContext(ProductContext);

  useEffect(() => {
    conditioner.addConditioner(name, condition, priority);
    return () => {
      conditioner.removeConditioner(name);
    };
  }, [condition, conditioner, name, priority]);
};

export const useSwatchValueSelect = (swatch, swatchCharacteristicIds = [], products = []) => {
  const { contexts: { ProductContext } } = useContext(ThemeContext);
  const { characteristics, setCharacteristics } = useContext(ProductContext);

  const resetChars = useMemo(() => {
    if (!swatchCharacteristicIds) {
      return null;
    }
    return swatchCharacteristicIds.reduce((acc, cur) => ({
      ...acc,
      [cur]: null,
    }), {});
  }, [swatchCharacteristicIds]);

  return useCallback((value) => {
    if (value.selectable && (!characteristics || characteristics[swatch.id] !== value.id)) {
      const newChars = {
        ...characteristics,
        [swatch.id]: value.id,
      };

      const matchedProduct = products && products.some(product => (
        isMatch(product.characteristics, newChars)
      ));

      // Check if new selection has a product, reset otherwise
      if (matchedProduct) {
        setCharacteristics(newChars);
      } else {
        setCharacteristics({
          ...characteristics,
          ...resetChars,
          [swatch.id]: value.id,
        });
      }
    }
  }, [products, swatch, setCharacteristics, characteristics, resetChars]);
};
