'use client';
import { getCartAsync } from '@/actions/cartActions';
import { RootState } from '@/reducers/rootReducer';
import { productsInterface } from '@/types/ProductInterface';
import { Spin, Table } from 'antd';
import Image from 'next/image';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Cart() {
  const dispatch = useDispatch();
  const { cartProducts, loading } = useSelector(
    (state: RootState) => state.cart,
  );

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumbnail: string) => (
        <>
          <Image src={thumbnail} width={140} height={140} alt="image" />
        </>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text: string) => (
        <>
          <span>{text}$</span>
        </>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (
        text: string,
        { quantity, price }: { quantity: number; price: string },
      ) => (
        <>
          <span>{quantity * Number(price)}$</span>
        </>
      ),
    },
  ];

  const totalPrice = useMemo(() => {
    let total = 0;
    cartProducts.map((item: productsInterface) => {
      total += Number(item.price) * (Number(item.quantity) || 0);
    });
    return total.toFixed(2);
  }, [cartProducts]);

  const tableFooter = () => {
    return (
      <span className="pe-5 text-end w-100 d-block">Total: {totalPrice}$</span>
    );
  };

  useEffect(() => {
    dispatch(getCartAsync());
  }, []);

  // getCartAsync

  if (loading) {
    <Spin size="large" className="mt-3 w-100 mx-auto" />;
  }

  return (
    <Table dataSource={cartProducts} columns={columns} footer={tableFooter} />
  );
}
