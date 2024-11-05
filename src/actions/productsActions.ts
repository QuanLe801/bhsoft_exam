import axiosInstance from '@/app/services/apiClient';
import { qs } from '@/app/utils/common';
import { productsQueryInterface } from '@/types/ProductInterface';
import { Dispatch } from 'redux';

export const getProductAsync = (values: productsQueryInterface) => {
  const query = {
    limit: values.limit,
    skip: (values.page - 1) * values.limit,
  };
  return async (dispatch: Dispatch) => {
    dispatch({ type: 'GET_PRODUCT_REQUEST' });
    try {
      const data = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API}/products?${qs(query)}`,
      );

      dispatch({ type: 'GET_PRODUCT_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'ERROR', error });
    }
  };
};
