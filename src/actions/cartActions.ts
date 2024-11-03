import axiosInstance from '@/app/services/apiClient';
import {
  payloadAddtoCardInterface,
  productsInterface,
} from '@/types/ProductInterface';
import axios from 'axios';
import { Dispatch } from 'redux';

export const addToCart = (product: payloadAddtoCardInterface) => ({
  type: 'ADD_TO_CART',
  payload: product,
});

// Async action (thunk)
export const addToCartAsync = (
  product: productsInterface,
  quantity: number,
) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: 'ADD_TO_CART_REQUEST' });

    const dataCart = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_MOCK_API}/cart`,
    );

    const checkCartExist: productsInterface = dataCart.data.find(
      (item: { id: string }) => item.id === product.id.toString(),
    );

    if (checkCartExist) {
      await axiosInstance
        .put(`${process.env.NEXT_PUBLIC_MOCK_API}/cart/${checkCartExist.id}`, {
          ...product,
          quantity: checkCartExist.quantity,
        })
        .catch(error => console.log(error));
      dispatch({ type: 'ADD_TO_CART_EXIST', payload: dataCart });
      return;
    }

    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_MOCK_API}/cart`,
        {
          ...product,
          quantity: quantity,
        },
      );

      dispatch({ type: 'ADD_TO_CART_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'ADD_TO_CART_FAILURE', error });
    }
    return;
  };
};

export const getCartAsync = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: 'GET_CART_REQUEST' });
    try {
      const data = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_MOCK_API}/cart`,
      );

      dispatch({ type: 'GET_CART_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'GET_CART_FAILURE', error });
    }
  };
};
