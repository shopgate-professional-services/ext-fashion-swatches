import { connect } from 'react-redux';
import { fetchProductImages } from '@shopgate/engage/product';
import { withCurrentProduct } from '@shopgate/engage/core';
import { getColorCharacteristicId, getProductVariantsProductsData } from './selectors';

/**
 * @param {ReactElement} Cmp .
 * @return {Object}
 */
export const withFetchProductImages = Cmp => connect(null, { fetchProductImages })(Cmp);

/**
 * @param {ReactElement} Cmp .
 * @return {Object}
 */
export const withColorVariantsData = Cmp => (
  withCurrentProduct(connect((state, { productId }) => ({
    products: getProductVariantsProductsData(state, { productId }),
    colorCharacteristicId: getColorCharacteristicId(state, { productId }),
  }))(Cmp))
);
