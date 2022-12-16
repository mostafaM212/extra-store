import { Product } from './../../models/product.model';
import { Cart } from './../../models/Cart.model';
import {
  loginUserAction,
  setUserCartsAction,
  setTotalPriceAction,
} from './../actions/auth.actions';
import { createReducer, on } from '@ngrx/store';
import { User } from './../../models/User.model';
export interface AuthState {
  user: User | null;
  carts: Cart[];
  token: string | null;
  totalPrice: number;
}

const initialState: AuthState = {
  user: null,
  carts: [],
  token: null,
  totalPrice: 0,
};

export const authReducer = createReducer(
  initialState,
  on(loginUserAction, (state, { user, token }) => {
    return {
      ...state,
      user: user,
      token: token,
    };
  }),
  on(setUserCartsAction, (state, { carts }) => {
    return {
      ...state,
      carts: [...carts],
    };
  }),
  on(setTotalPriceAction, (state, { totalPrice }) => {
    return {
      ...state,
      totalPrice: totalPrice,
    };
  })
);
