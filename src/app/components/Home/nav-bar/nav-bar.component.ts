import { Cart } from 'src/app/models/Cart.model';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import {
  faUserPlus,
  faUser,
  faCartPlus,
} from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/AuthService.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  isNavbarCollapsed: boolean = true;
  login = faUser;
  register = faUserPlus;
  facart = faCartPlus;
  user: User | null = null;
  cart: number = 0;
  constructor(
    private store: Store<{ auth: { user: User; token: string; cart: Cart[] } }>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe((user) => {
      this.user = user.user;
    });
    this.authService.userNumberOfCarts.subscribe((data) => {
      this.cart = data;
    });
  }

  toggleNavBar = () => {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  };
}
