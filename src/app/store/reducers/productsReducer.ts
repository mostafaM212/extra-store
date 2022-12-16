import { Product } from 'src/app/models/product.model';
import { setProducts, SET_PRODUCTS } from '../actions/products.actions';
import { Action, createReducer, on } from '@ngrx/store';

export interface InitialState {
  products: Product[];
}

let initialState: InitialState = {
  products: [],
};

export const productsReducer = createReducer(
  initialState,
  on(setProducts, (state, { products }) => {
    return {
      ...state,
      products: [...products],
    };
  })
);
