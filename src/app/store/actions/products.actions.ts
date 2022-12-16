import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';

export const SET_PRODUCTS = 'SET_PRODUCTS';

export const setProducts = createAction(
  SET_PRODUCTS,
  props<{ products: Product[] }>()
);
