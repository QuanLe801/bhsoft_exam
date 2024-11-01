/* eslint-disable @typescript-eslint/no-explicit-any */
import { checkAuth } from '@/app/services/auth/checkAuth';
import { userInterface } from '@/types/LoginInterface';

const initialState: {
  loading: boolean;
  data: userInterface | null;
  error: any;
  message: string | null;
} = {
  loading: false,
  data: null,
  error: null,
  message: null,
};

const userReducer = (
  state = initialState,
  action: { type: string; payload: any; error: unknown },
) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loading: true,
        message: 'logging in...!',
      };
    case 'LOGIN_SUCCESS':
      if (action?.payload?.status === 200) {
        checkAuth.setAccessToken(action.payload?.data?.accessToken);
        checkAuth.setRefreshToken(action.payload?.data?.refreshToken);
      }
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        message: `Successfully! welcome back ${action.payload?.data?.username}`,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error,
        data: null,
        message: 'Username or password incorrect!',
      };
    default:
      return state;
  }
};

export default userReducer;
