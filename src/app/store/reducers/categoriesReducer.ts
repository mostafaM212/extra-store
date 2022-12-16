import { createReducer, on } from '@ngrx/store';
import { setCategories } from '../actions/categories.action';
import { Category } from './../../models/Category.model';

export interface InitialState {
  categories: Category[];
}

const initialState: InitialState = {
  categories: [],
};

export const categoriesReducer = createReducer(
  initialState,
  on(setCategories, (state, { categories }) => {
    return {
      categories: [...categories],
    };
  })
);
