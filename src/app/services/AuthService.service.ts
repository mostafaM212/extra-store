import { Product } from './../models/product.model';
import { ProductsService } from './ProductsService.service';
import { Cart } from 'src/app/models/Cart.model';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { User } from './../models/User.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  loginUserAction,
  setUserCartsAction,
} from '../store/actions/auth.actions';
import { CartService } from './CartService.service';

interface CammeingCart {
  userId: number;
  id: number;
  date: Date;
  products: { productId: number; quantity: number }[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  userNumberOfCarts: BehaviorSubject<number> = new BehaviorSubject(0);
  getUserId: BehaviorSubject<number> = new BehaviorSubject(-1);
  userId: number = -1;
  userProducts: any[] = [];
  logginError: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<{ auth: { user: User; token: string } }>,
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  register = (user: User): void => {
    this.http.post('https://fakestoreapi.com/users', user).subscribe(
      (data: any) => {
        user._id = data.id;
        this.router.navigate(['login']);
      },
      (e) => {
        console.log(e);
      }
    );
  };

  login = (
    username: string,
    password: string,
    user: User | undefined
  ): void => {
    this.http
      .post<{ token: string }>('https://fakestoreapi.com/auth/login', {
        username: username,
        password: password,
      })
      .subscribe(
        (data: { token: string }) => {
          if (user) {
            this.getUserId.next(user._id);
            this.store.dispatch(
              loginUserAction({ user: user, token: data['token'] })
            );

            this.userId = user._id;
            let transformedData = JSON.stringify({ token: data.token, user });
            localStorage.setItem('data', transformedData);
            this.router.navigate(['profile']);
          }
        },
        (e) => {
          this.onLogInError(e.status);
        }
      );
  };

  autoLogin = (): void => {
    let data = localStorage.getItem('data');
    if (data !== null) {
      let transformedData = JSON.parse(data);

      let user = new User(
        transformedData.user.id,
        transformedData.user.email,
        transformedData.user.username,
        transformedData.user.password,
        transformedData.user.name,
        transformedData.user.address,
        transformedData.user.phone
      );
      this.userId = user._id;
      this.getUserId.next(user._id);

      this.productsService.getAllProducts();
      this.http
        .get<CammeingCart[]>('https://fakestoreapi.com/carts/user/' + user._id)
        .subscribe((data) => {
          this.store.dispatch(
            setUserCartsAction({ carts: this.setUserCart(data) })
          );
          this.userNumberOfCarts.next(data.length);
        });
      this.store.dispatch(
        loginUserAction({ user, token: transformedData.token })
      );
    }
  };
  getUserCarts = (userId: number): Cart[] => {
    console.log(userId, 'id');
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
    console.log(userCart);

    return userCart;
  };

  onLogInError = (errorCode: number) => {
    if (errorCode == 401) {
      this.logginError.next('invalid username or password');
    } else if (errorCode == 0) {
      this.logginError.next('please check the Enternet connection');
    }
  };
}
