import { payloadAddtoCardInterface } from '@/types/ProductInterface';
import axios from 'axios';
import { Dispatch } from 'redux';

export const addToCart = (product: payloadAddtoCardInterface) => ({
  type: 'ADD_TO_CART',
  payload: product,
});

// Async action (thunk)
export const addToCartAsync = (
  product: payloadAddtoCardInterface,
  userId: number,
) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: 'ADD_TO_CART_REQUEST' });
    try {
      const data = await axios.put(`${process.env.NEXT_PUBLIC_API}/carts/1`, {
        merge: true,
        userId: userId,
        products: [{ ...product }],
      });

      console.log('datadatadata', data);

      dispatch({ type: 'ADD_TO_CART_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'ADD_TO_CART_FAILURE', error });
    }
  };
};

export const getCartAsync = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: 'GET_CART_REQUEST' });
    try {
      const data = await axios.get(`${process.env.NEXT_PUBLIC_API}/carts/1`);

      console.log('datadatadata', data);

      dispatch({ type: 'GET_CART_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'GET_CART_FAILURE', error });
    }
  };
};
