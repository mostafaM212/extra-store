import { User } from './models/User.model';
import { ProductsService } from './services/ProductsService.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/AuthService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'extraStore';
  constructor(
    private authService: AuthService,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts();
    this.authService.autoLogin();

    console.log('test');
  }
}
