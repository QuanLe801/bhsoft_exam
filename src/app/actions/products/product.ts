import { qs } from '@/app/utils/common';
import axiosInstance from '../auth/apiClient';

interface productsProps {
  limit: number;
  page: number;
}

export default async function getProduct(values: productsProps) {
  const query = { limit: values.limit, skip: (values.page - 1) * values.limit };
  const data = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_API}/products?${qs(query)}`,
  );

  return data;
}
