import { checkAuth } from '@/app/services/auth/checkAuth';
import axios from 'axios';
import { redirect } from 'next/navigation';

//This file need to replaces middleware. In order to config the axios => make it check auth before doing something
//If an user existing ( logged ) => accept request => if not , redirect to login page
const axiosInstance = axios.create({
  // timeout: 5000,
});

axiosInstance.interceptors.request.use(config => {
  const token = checkAuth.getAccessToken();

  if (!token) {
    checkAuth.logout();
    Promise.reject('No token found');
    redirect('/login');
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
