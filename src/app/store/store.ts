import { ActionReducerMap } from '@ngrx/store';
import * as productReducer from './reducers/productsReducer';
import * as categoriesReducer from './reducers/categoriesReducer';
import * as authReducer from './reducers/AuthReducer.reducer';

export interface AppState {
  products: productReducer.InitialState;
  categories: categoriesReducer.InitialState;
  auth: authReducer.AuthState;
}

export const AppState: ActionReducerMap<AppState> = {
  products: productReducer.productsReducer,
  categories: categoriesReducer.categoriesReducer,
  auth: authReducer.authReducer,
};
