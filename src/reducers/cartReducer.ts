/* eslint-disable @typescript-eslint/no-explicit-any */

import { productsInterface } from '@/types/ProductInterface';

interface CartState {
  cartProducts: productsInterface[];
  loading: boolean;
  error: any;
}

const initialState: CartState = {
  loading: false,
  cartProducts: [],
  error: null,
};

const cartReducer = (
  state = initialState,
  action: { type: string; payload: any; error: unknown },
) => {
  switch (action.type) {
    case 'GET_CART_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'GET_CART_SUCCESS':
      return {
        ...state,
        loading: false,
        cartProducts: action.payload.data,
      };
    case 'GET_CART_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
        cartProducts: null,
      };
    case 'ADD_TO_CART_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'ADD_TO_CART_SUCCESS':
      return {
        ...state,
        loading: false,
        cartProducts: state.cartProducts.concat(action.payload.data),
      };
    case 'ADD_TO_CART_EXIST':
      return {
        ...state,
        loading: false,
        // cartProducts: action.payload.data,
      };
    case 'ADD_TO_CART_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
        cartProducts: null,
      };
    default:
      return state;
  }
};

export default cartReducer;
