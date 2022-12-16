import { setCategories } from './../store/actions/categories.action';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Category } from './../models/Category.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  loading: boolean = false;
  constructor(
    private http: HttpClient,
    private store: Store<{ categories: { categories: Category[] } }>
  ) {}

  getAllCategories = (): Category[] => {
    let categories: Category[] = [];
    this.loading = true;
    this.http
      .get<string[]>('https://fakestoreapi.com/products/categories')
      .subscribe((data) => {
        data.map((element) => {
          categories.push(new Category(element));
        });

        this.store.dispatch(setCategories({ categories }));
      });

    return categories;
  };
}
