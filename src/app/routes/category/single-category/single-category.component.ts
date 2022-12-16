import { ProductsService } from 'src/app/services/ProductsService.service';
import { Product } from './../../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css'],
})
export class SingleCategoryComponent implements OnInit {
  products: Product[] = [];
  searchedProducts: Product[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((query) => {
      if (query['search']) {
        this.productsService.onSearch(query['search']);
      }
    });
    this.productsService.searchedProducts.subscribe((products) => {
      this.searchedProducts = products;
    });
    this.activatedRoute.data.subscribe((data) => {
      this.products = data['products'];
    });
  }
}
