import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { setProducts } from '../store/actions/products.actions';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  loading: boolean = false;
  products: Product[] = [];
  searchedProducts: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(
    []
  );
  constructor(
    private http: HttpClient,
    private store: Store<{ products: { products: Product[] } }>
  ) {}

  getAllProducts = (): Product[] => {
    this.loading = true;
    let products: Product[] = [];

    this.http
      .get<Product[]>('https://fakestoreapi.com/products')
      .subscribe((data) => {
        this.loading = false;
        data.map((product) => {
          products.push(
            this.transformDataToProduct(
              product.id,
              product.title,
              product.price,
              product.category,
              product.image,
              product.description,
              product.rating
            )
          );
        });
        this.store.dispatch(setProducts({ products }));
        this.products = products;
      });

    return products;
  };

  transformDataToProduct = (
    _id: number,
    title: string,
    price: string,
    category: string,
    image: string,
    description: string,
    rating: { rate: number; count: number },
    quantity?: number
  ): Product => {
    return new Product(
      _id,
      title,
      price,
      category,
      image,
      description,
      rating,
      quantity
    );
  };

  getProductsByCategory = (category: string): Product[] => {
    let products: Product[] = [];

    products = this.products.filter((product) => product.category === category);

    return products;
  };

  getProductsByName = (searchQuery: string): Product[] => {
    let products: Product[] = [];

    this.products.map((product) => {
      if (product.title.includes(searchQuery)) {
        products.push(product);
      }
    });

    return products;
  };

  onSearch = (name: string) => {
    let products: Product[] = this.getProductsByName(name);
    console.log(this.getProductsByName(name), 'products search');
    this.searchedProducts.next(products);
  };

  getProductById = (id: number): Product | undefined => {
    return this.products.find((product) => {
      return product.id == id;
    });
  };
}
