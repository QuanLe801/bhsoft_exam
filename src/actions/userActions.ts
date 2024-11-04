import { RootState } from '@/reducers/rootReducer';
import { loginInterface } from '@/types/LoginInterface';
import axios from 'axios';
import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

// Async action (thunk)
export const login = (
  values: loginInterface,
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' });

    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/auth/login`,
        {
          ...values,
          expiresInMins: values.expiresInMins || 60,
        },
      );

      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'ERROR', error });
    }
  };
};
