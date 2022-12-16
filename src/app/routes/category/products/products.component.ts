import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/ProductsService.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  querySearch: string = '';
  searchedProducts: Product[] = [];
  constructor(
    private store: Store<{ products: { products: Product[] } }>,
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((query) => {
      if (query['search']) {
        this.querySearch = query['search'];
        this.productsService.onSearch(query['search']);
      }
    });
    this.productsService.searchedProducts.subscribe((products) => {
      this.searchedProducts = products;
    });
    if (this.querySearch.length === 0) {
      this.store.select('products').subscribe((products) => {
        this.products = products.products;
      });
    }
    if (this.products.length === 0) {
      this.products = this.productsService.getAllProducts();
    }
  }
}
