import { Product } from './../../models/product.model';
import { Category } from './../../models/Category.model';
import { CategoryService } from './../../services/CategoriesService.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/ProductsService.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentCardNumber: number = 0;
  categories: Category[] = [];
  constructor(
    private productService: ProductsService,
    private categoriesService: CategoryService,
    private store: Store<{ products: { products: Product[] } }>
  ) {}

  ngOnInit(): void {
    this.store.select('products').subscribe((products) => {
      if (products.products.length == 0) {
        this.productService.getAllProducts();
      }
    });
    if (this.categories.length == 0) {
      this.categories = this.categoriesService.getAllCategories();
    }
  }
  nextCard = () => {
    if (this.currentCardNumber < 2) {
      this.currentCardNumber += 1;
      console.log(this.currentCardNumber);
    }
  };
  previousCard = () => {
    if (this.currentCardNumber > 0) {
      this.currentCardNumber -= 1;
      console.log(this.currentCardNumber);
    }
  };
}
