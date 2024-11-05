import { combineReducers } from 'redux';
import userReducer from './userReducer';
import cartReducer from './cartReducer';
import productReducer from './productReducer';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  product: productReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
