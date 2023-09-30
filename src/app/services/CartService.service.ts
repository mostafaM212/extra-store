import { HttpClient } from '@angular/common/http';
import { Product } from './../models/product.model';
import { setTotalPriceAction } from './../store/actions/auth.actions';
import { Cart } from './../models/Cart.model';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  cartPrices: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  constructor(
    private store: Store<{ auth: { carts: Cart[]; totalPrice: number } }>,
    private http: HttpClient
  ) {}

  calculateTotalPrice = (products: Product[]): number => {
    let totalPrices: number = 0;

    products.map((product) => {
      if (product.quantity) {
        totalPrices += product.quantity * +product.price;
      }
    });
    // console.log(totalPrices, 'totla');
    //this.store.dispatch(setTotalPriceAction({ totalPrice: totalPrices }));
    return totalPrices;
  };

  getUserCarts = (id: number) => {
    let userCarts: Cart[] = [];
    this.http
      .get('https://fakestoreapi.com/carts/user/' + id)
      .subscribe((data) => {
        console.log(data);
      });

    return userCarts;
  };
}
