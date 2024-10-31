import { checkAuth } from '@/app/services/auth/checkAuth';
import axios from 'axios';

interface loginProps {
  username: string;
  password: string;
  expiresInMins?: number;
}

export default async function login(values: loginProps) {
  const data = await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
    ...values,
    expiresInMins: values.expiresInMins || 60,
  });

  if (data?.status === 200) {
    checkAuth.setAccessToken(data?.data?.accessToken);
    checkAuth.setRefreshToken(data?.data?.refreshToken);
  }
  return data;
}
