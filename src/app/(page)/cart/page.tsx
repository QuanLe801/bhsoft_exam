'use client';
import { getCartAsync } from '@/actions/cartActions';
import { RootState } from '@/reducers/rootReducer';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Cart() {
  const dispatch = useDispatch();
  const { cartProducts, loading } = useSelector(
    (state: RootState) => state.cart,
  );
  useEffect(() => {
    dispatch(getCartAsync());
  }, []);

  console.log(cartProducts);
  // getCartAsync
  return <div>page</div>;
}
