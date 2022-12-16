import { createAction, props } from '@ngrx/store';
import { Category } from './../../models/Category.model';

export const SET_CATEGORIES = 'SET_CATEGORIES';

export const setCategories = createAction(
  SET_CATEGORIES,
  props<{ categories: Category[] }>()
);
