import {
  useEffect, useContext, useCallback, useMemo,
} from 'react';
import isMatch from 'lodash.ismatch';
import {
  router, ThemeContext, useRoute, useNavigation,
} from '@shopgate/engage/core';

export const useNavigateToVariant = (products) => {
  const { contexts: { ProductContext } } = useContext(ThemeContext);
  const { characteristics, variantId } = useContext(ProductContext);

  /** @see ProductCharacteristics.checkSelectedCharacteristics */
  useEffect(() => {
    if (!products || !characteristics) {
      return;
    }

    const filteredChars = Object.keys(characteristics).filter(key => !!characteristics[key]);
    if (Object.keys(products[0].characteristics).length > filteredChars.length) {
      // Not all chars yet selected
      return;
    }

    const prs = products.filter(product => (
      isMatch(product.characteristics, characteristics)
    ));

    if (prs.length && prs[0].id !== variantId) {
      const route = router.getCurrentRoute();
      router.update(route.id, { productId: prs[0].id });
    }
  }, [characteristics, variantId, products]);
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

export const useIsVariantReady = (products = []) => {
  const { contexts: { ProductContext } } = useContext(ThemeContext);
  const { characteristics } = useContext(ProductContext);

  return useMemo(() => {
    if (!products || !characteristics) {
      return false;
    }
    const filteredChars = Object.keys(characteristics).filter(key => !!characteristics[key]);
    // Compare to first product chars length
    return filteredChars.length === Object.keys(products[0].characteristics).length;
  }, [characteristics, products]);
};

/**
 * Remember variant selection into route state and restore for pure PDP
 * @returns {void}
 */
export const useRouteCharacteristics = () => {
  const { contexts: { ProductContext } } = useContext(ThemeContext);
  const { variantId, characteristics, setCharacteristics } = useContext(ProductContext);
  const { state: { preCharacteristics } } = useRoute();
  const { update } = useNavigation();

  useEffect(() => {
    if (variantId) {
      // Do nothing
      return;
    }

    if (characteristics && (!preCharacteristics || !isMatch(characteristics, preCharacteristics))) {
      // Update route with next characteristics
      update({ preCharacteristics: characteristics });
    }
    if (!characteristics && preCharacteristics) {
      // Restore from route characteristics
      setCharacteristics(preCharacteristics);
    }
  }, [update, setCharacteristics, variantId, preCharacteristics, characteristics]);
};
