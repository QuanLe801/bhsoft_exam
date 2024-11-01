/* eslint-disable @typescript-eslint/no-explicit-any */
const initialState = {
  loading: false,
  cartProducts: null,
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
        products: null,
      };
    case 'GET_CART_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
        products: null,
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
        products: action.payload.data,
      };
    case 'ADD_TO_CART_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
        products: null,
      };
    default:
      return state;
  }
};

export default cartReducer;
