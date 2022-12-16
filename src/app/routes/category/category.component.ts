import { ProductsService } from 'src/app/services/ProductsService.service';
import { Product } from './../../models/product.model';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  @ViewChild('form') form: NgForm | undefined;
  showChild: boolean = false;
  products: Product[] = [];
  searchedQuery: string = '';
  constructor(
    private store: Store<{ products: { products: Product[] } }>,
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.select('products').subscribe((products) => {
      this.products = products.products;
    });
    if (this.products.length === 0) {
      this.products = this.productsService.getAllProducts();
    }
    this.activatedRoute.queryParams.subscribe((query) => {
      if (query['search']) {
        this.searchedQuery = query['search'];
        this.productsService.onSearch(query['search']);
      }
    });
  }

  onSearchHandler = () => {
    console.log(this.form?.value['search']);
    this.router.navigate(['category'], {
      queryParams: { search: this.form?.value['search'] },
    });

    this.products = [
      ...this.productsService.getProductsByName(this.form?.value['search']),
    ];
  };
  onClickHandler = (category: string) => {
    this.showChild = true;

    this.router.navigate(['category', category]);
  };
  printMe = () => {
    if (this.form?.value['search'].length == 0) {
      this.productsService.searchedProducts.next([]);
      this.router.navigate(['category']);
    }
  };
}
