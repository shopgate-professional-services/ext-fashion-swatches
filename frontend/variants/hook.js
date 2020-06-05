import { useEffect, useContext, useCallback } from 'react';
import isMatch from 'lodash.ismatch';
import { router, ThemeContext } from '@shopgate/engage/core';

export const useNavigateToVariant = (products) => {
  const { contexts: { ProductContext } } = useContext(ThemeContext);
  const { characteristics, variantId } = useContext(ProductContext);

  /** @see ProductCharacteristics.checkSelectedCharacteristics */
  useEffect(() => {
    if (!products || !characteristics) {
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

export const useConditioner = (name, condition) => {
  const { contexts: { ProductContext } } = useContext(ThemeContext);
  const { conditioner } = useContext(ProductContext);

  useEffect(() => {
    conditioner.addConditioner(name, condition);
    return () => {
      conditioner.removeConditioner(name);
    };
  }, [condition, conditioner, name]);
};

export const useSwatchValueSelect = (swatch) => {
  const { contexts: { ProductContext } } = useContext(ThemeContext);
  const { characteristics, setCharacteristics } = useContext(ProductContext);

  return useCallback((value) => {
    if (value.selectable && (!characteristics || characteristics[swatch.id] !== value.id)) {
      setCharacteristics({
        ...characteristics,
        [swatch.id]: value.id,
      });
    }
  }, [swatch, setCharacteristics, characteristics]);
};
