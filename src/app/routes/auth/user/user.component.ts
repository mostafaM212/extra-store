import { Product } from 'src/app/models/product.model';
import {
  faPhone,
  faUser,
  faCartPlus,
  faAddressBook,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';
import { Cart } from 'src/app/models/Cart.model';

import { AfterContentInit, Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/AuthService.service';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/User.model';
import { CartService } from 'src/app/services/CartService.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, DoCheck, AfterContentInit {
  userIcon = faUser;
  phone = faPhone;
  cart = faCartPlus;
  address = faAddressBook;
  money = faMoneyBill;
  userCarts: Cart[] = [];
  totalPrice: number = 0;
  showSpinner: boolean = false;
  constructor(
    public authService: AuthService,
    private cartService: CartService
  ) {}
  ngAfterContentInit(): void {}

  ngOnInit(): void {
    this.showSpinner = true;
    let carts: Cart[] = [];

    setTimeout(() => {
      this.showSpinner = false;
    }, 2000);
  }
  ngDoCheck(): void {}
}
