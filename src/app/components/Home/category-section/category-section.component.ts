import { Product } from './../../../models/product.model';
import { ProductsService } from 'src/app/services/ProductsService.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-section',
  templateUrl: './category-section.component.html',
  styleUrls: ['./category-section.component.css'],
})
export class CategorySectionComponent implements OnInit {
  @Input('categoryName') name: string = '';
  products: Product[] = [];
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.products = this.productService.getProductsByCategory(this.name);

    if (this.products.length === 0) {
      setTimeout(() => {
        this.products = this.productService.getProductsByCategory(this.name);
      }, 1000);
    }
  }
}
