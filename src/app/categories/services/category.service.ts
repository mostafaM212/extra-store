import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '../modals/Category.modal';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl: string = environment.backendUrl + 'category';

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<{ message: string; categories: Category[] }>(
      this.baseUrl
    );
  }
  getCategory(id: string) {
    return this.http.get<{ message: string; category: Category }>(
      this.baseUrl + '/' + id
    );
  }
  addCategory(data: Category) {
    return this.http.post(this.baseUrl, data);
  }
  updateCategory(id: string, data: Category) {
    return this.http.put(this.baseUrl + '/' + id, data);
  }
}
