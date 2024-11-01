'use client';
import { RootState } from '@/reducers/rootReducer';
import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '../typography/typography';
import Image from 'next/image';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  return (
    <section className="d-flex container justify-content-end items-center mb-4">
      <ShoppingCartOutlined
        className="me-4"
        style={{ cursor: 'pointer' }}
        onClick={() => router.push('/cart')}
      />
      <div className="p-2 d-flex items-center justify-content-center border rounded">
        <Image src={user?.data?.image} alt="avatar" width={24} height={24} />
        <Typography className="ms-2 mb-0">{user?.data?.username}</Typography>
      </div>
    </section>
  );
}
