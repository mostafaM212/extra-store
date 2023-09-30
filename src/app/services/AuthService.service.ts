import { Product } from './../models/product.model';
import { ProductsService } from './ProductsService.service';
import { Cart } from 'src/app/models/Cart.model';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { User } from './../models/User.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import {
  loginUserAction,
  setUserCartsAction,
} from '../store/actions/auth.actions';
import { CartService } from './CartService.service';
import { environment } from '../../environments/environment';

interface CammeingCart {
  userId: number;
  id: number;
  date: Date;
  products: { productId: number; quantity: number }[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  baseUrl: string = environment.backendUrl + 'users';
  userNumberOfCarts: BehaviorSubject<number> = new BehaviorSubject(0);
  getUserId: BehaviorSubject<number> = new BehaviorSubject(-1);
  userProducts: any[] = [];
  isAuthenticated$ = new BehaviorSubject<boolean>(false);
  user$ = new BehaviorSubject<User | null>(null);
  token$ = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<{ auth: { user: User; token: string } }>,
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  register(user: User) {
    return this.http.post(this.baseUrl, user);
  }

  login = (data: any) => {
    return this.http.post<{ token: string; user: User; message: string }>(
      this.baseUrl + '/login',
      data
    );
  };

  autoLogin = (): void => {
    let tokenExpirationDate = localStorage.getItem('tokenExpirationDate');
    if (
      tokenExpirationDate !== null &&
      new Date(tokenExpirationDate) > new Date()
    ) {
      console.log('test', 'is logged in ');
      try {
        let user = localStorage.getItem('user');
        let token = localStorage.getItem('token');

        if (user !== null && token !== null) {
          user = JSON.parse(user);
          this.user$.next(user as any);
          this.isAuthenticated$.next(true);
          this.token$.next(token);
        }
      } catch (error) {
        this.logout();
        console.log('test', error);
      }
    } else {
      this.logout();
    }
  };
  getUserCarts = (userId: number): Cart[] => {
    let userCart: Cart[] = [];
    this.http
      .get<CammeingCart[]>('https://fakestoreapi.com/carts/user/' + userId)
      .subscribe((data) => {
        console.log('data', data);
        this.store.dispatch(
          setUserCartsAction({ carts: this.setUserCart(data) })
        );

        userCart = [...this.setUserCart(data)];
      });

    return userCart;
  };

  setUserCart = (carts: CammeingCart[]): Cart[] => {
    let userCart: Cart[] = [];

    carts.map((cart) => {
      let userProducts: Product[] = [];
      cart.products.map((product) => {
        let productUser: Product | undefined =
          this.productsService.getProductById(product.productId);
        if (productUser) {
          let newProduct: Product = this.productsService.transformDataToProduct(
            productUser?.id,
            productUser?.title,
            productUser?.price,
            productUser?.category,
            productUser?.image,
            productUser?.description,
            productUser?.rating,
            product.quantity
          );
          userProducts.push(newProduct);
        }
      });
      userCart.push(
        new Cart(
          cart.id,
          cart.userId,
          cart.date,
          userProducts,
          this.cartService.calculateTotalPrice(userProducts)
        )
      );
    });

    return userCart;
  };

  saveUserDataToLocalStorage(LoginRequest: any) {
    try {
      localStorage.setItem('token', LoginRequest.token);
      localStorage.setItem('user', JSON.stringify(LoginRequest.user));
      localStorage.setItem(
        'tokenExpirationDate',
        new Date(new Date().setHours(new Date().getHours() + 1)).toISOString()
      );
    } catch (error) {
      console.log('test', error);
    }
  }
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpirationDate');
    this.user$.next(null);
    this.isAuthenticated$.next(false);
    this.token$.next(null);
  }
}
