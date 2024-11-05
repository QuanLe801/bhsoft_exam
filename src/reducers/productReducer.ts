/* eslint-disable @typescript-eslint/no-explicit-any */
import { productsInterface } from '@/types/ProductInterface';

interface CartState {
  products: productsInterface[];
  loading: boolean;
  error: any;
}

const initialState: CartState = {
  loading: false,
  error: null,
  products: [],
};

const productReducer = (
  state = initialState,
  action: { type: string; payload: any; error: unknown },
) => {
  switch (action.type) {
    case 'GET_PRODUCT_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'GET_PRODUCT_SUCCESS':
      return {
        ...state,
        loading: false,
        products:
          action.payload.data.skip === 0
            ? action.payload.data.products
            : state.products.concat(action.payload.data.products),
      };
    case 'ERROR':
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default productReducer;
