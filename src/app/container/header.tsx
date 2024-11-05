/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { RootState } from '@/reducers/rootReducer';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { Badge } from 'antd';
import styled from 'styled-components';
import { getCartAsync } from '@/actions/cartActions';
import Typography from '@/app/typography/typography';

const StyledShoppingCartOutlined = styled(ShoppingCartOutlined)`
  & > svg {
    width: 20px;
    height: 20px;
  }
`;

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const { cartProducts } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch<any>(getCartAsync());
  }, [user?.data]);

  return (
    <section className="d-flex container justify-content-between items-center align-items-center mb-4">
      {user?.data && (
        <>
          <div onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
            <HomeOutlined />
          </div>
          <section className="d-flex container justify-content-end items-center  align-items-center">
            <Badge
              count={cartProducts?.length}
              style={{
                width: '20px',
                height: '20px',
              }}
              className="me-4"
            >
              <StyledShoppingCartOutlined
                style={{ cursor: 'pointer' }}
                onClick={() => router.push('/cart')}
              />
            </Badge>

            <div className="p-2 d-flex items-center justify-content-center border rounded">
              <Image
                src={user?.data?.image}
                alt="avatar"
                width={24}
                height={24}
              />
              <Typography className="ms-2 mb-0">
                {user?.data?.username}
              </Typography>
            </div>
          </section>
        </>
      )}
    </section>
  );
}
