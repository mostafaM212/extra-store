import { Product } from './../../models/product.model';
import { User } from './../../models/User.model';
import { createAction, props } from '@ngrx/store';
import { Cart } from 'src/app/models/Cart.model';

export const LOGIN_USER = 'LOGIN_USER';
export const SET_CARTS = 'SET_CARTS';
export const SET_TOTAL_PRICE = 'SET_USER_PRODUCTS';

export const loginUserAction = createAction(
  LOGIN_USER,
  props<{ user: User; token: string }>()
);

export const setUserCartsAction = createAction(
  SET_CARTS,
  props<{ carts: Cart[] }>()
);

export const setTotalPriceAction = createAction(
  SET_TOTAL_PRICE,
  props<{ totalPrice: number }>()
);
