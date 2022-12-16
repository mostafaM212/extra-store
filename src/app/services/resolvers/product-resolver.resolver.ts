import { HttpClient } from '@angular/common/http';
import { ProductsService } from './../ProductsService.service';
import { Product } from './../../models/product.model';
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductResolverResolver implements Resolve<Product> {
  constructor(
    private productsService: ProductsService,
    private http: HttpClient
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> | Product {
    let product: Product | undefined = this.productsService.getProductById(
      route.params['id']
    );
    if (product?.id) {
      return product;
    }
    return this.http.get<Product>(
      'https://fakestoreapi.com/products/' + route.params['id']
    );
  }
}
