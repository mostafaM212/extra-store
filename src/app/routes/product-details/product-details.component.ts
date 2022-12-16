import { Product } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product = new Product(1, '', '', '', '', '', { rate: 1, count: 0 });
  CartPlus = faCartPlus;
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.data.subscribe((data) => {
      this.product = data['product'];
    });
  }

  ngOnInit(): void {}
}
