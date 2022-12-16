import { Product } from 'src/app/models/product.model';
import {
  faPhone,
  faUser,
  faCartPlus,
  faAddressBook,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';
import { Cart } from 'src/app/models/Cart.model';

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/AuthService.service';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/User.model';
import { CartService } from 'src/app/services/CartService.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userIcon = faUser;
  phone = faPhone;
  cart = faCartPlus;
  address = faAddressBook;
  money = faMoneyBill;
  userCarts: Cart[] = [];
  user: User | null = null;
  totalPrice: number = 0;
  constructor(
    private authService: AuthService,
    private store: Store<{
      auth: { user: User; token: string; carts: Cart[]; totalPrice: number };
    }>
  ) {
    this.authService.getUserId.subscribe((data) => {
      console.log(data, 'ser');
    });
  }

  ngOnInit(): void {
    let carts: Cart[] = [];
    this.store.select('auth').subscribe((data) => {
      this.user = data.user;
      data.carts.map((cart) => {
        if (cart.totalPrice) {
          this.totalPrice += cart.totalPrice;
        }
      });
      if (data.carts.length > 0) {
        this.userCarts = data.carts;
        carts = data.carts;
      }
    });
  }
}
