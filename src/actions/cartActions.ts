import axiosInstance from '@/app/services/apiClient';
import {
  payloadAddtoCardInterface,
  productsInterface,
} from '@/types/ProductInterface';
import axios from 'axios';
import { Dispatch } from 'redux';
import { debounce } from 'lodash';

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
        .put(
          `${process.env.NEXT_PUBLIC_MOCK_API}/cart/${checkCartExist.idProduct}`,
          {
            ...product,
            quantity: checkCartExist.quantity,
          },
        )
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

export const updateCartLocal = (product: productsInterface) => ({
  type: 'UPDATE_CART_LOCAL',
  payload: product,
});

export const updateCartDebounce = debounce(
  async (dispatch: Dispatch, product: productsInterface) => {
    dispatch({ type: 'UPDATE_CART_REQUEST' });
    try {
      await axiosInstance
        .put(`${process.env.NEXT_PUBLIC_MOCK_API}/cart/${product.idProduct}`, {
          ...product,
          quantity: product.quantity,
        })
        .catch(error => console.log(error));

      dispatch({
        type: 'UPDATE_CART_SUCCESS',
      });
    } catch (error) {
      dispatch({ type: 'UPDATE_CART_FAILURE', error });
    }
  },
  500,
);

export const updateCart = (product: productsInterface) => {
  return (dispatch: Dispatch) => {
    // Update cart local
    dispatch(updateCartLocal(product));

    // Debounce API call
    updateCartDebounce(dispatch, product);
  };
};

export const deleteOneCart = (product: productsInterface) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: 'DELETE_CART_REQUEST' });
    try {
      await axiosInstance.delete(
        `${process.env.NEXT_PUBLIC_MOCK_API}/cart/${product.idProduct}`,
      );

      dispatch({ type: 'DELETE_CART_SUCCESS', payload: product });
    } catch (error) {
      dispatch({ type: 'DELETE_CART_FAILURE', error });
    }
  };
};
