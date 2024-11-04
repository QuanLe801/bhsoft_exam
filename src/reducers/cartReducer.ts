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
      };
    case 'ADD_TO_CART_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'UPDATE_CART_LOCAL':
      const findCartIndex = state?.cartProducts?.findIndex(
        item => item.id == action.payload.id,
      );
      return {
        ...state,
        loading: true,
        cartProducts: [
          ...state.cartProducts.slice(0, findCartIndex),
          {
            ...action.payload,
          },
          ...state.cartProducts.slice(findCartIndex + 1),
        ],
      };
    case 'UPDATE_CART_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'UPDATE_CART_SUCCESS':
      return {
        ...state,
        loading: false,
      };
    case 'UPDATE_CART_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'DELETE_CART_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'DELETE_CART_SUCCESS':
      const filterCartDelete = state?.cartProducts?.filter(
        item => item.id !== action.payload.id,
      );
      return {
        ...state,
        loading: false,
        cartProducts: filterCartDelete,
      };
    case 'DELETE_CART_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default cartReducer;
