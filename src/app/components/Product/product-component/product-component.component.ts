import { Router } from '@angular/router';
import { Product } from './../../../models/product.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.css'],
})
export class ProductComponentComponent implements OnInit {
  @Input('product') product: Product = new Product(0, '', '', '', '', '', {
    rate: 0,
    count: 0,
  });
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onClickHandler = (): void => {
    this.router.navigate(['product', this.product.id]);
  };
}
