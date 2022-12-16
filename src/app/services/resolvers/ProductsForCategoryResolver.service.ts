import { HttpClient } from '@angular/common/http';
import { Product } from './../../models/product.model';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsForCategoryResolver implements Resolve<Product[]> {
  constructor(private http: HttpClient) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Product[] | Observable<Product[]> | Promise<Product[]> {
    return this.http.get<Product[]>(
      'https://fakestoreapi.com/products/category/' + route.params['id']
    );
  }
}
