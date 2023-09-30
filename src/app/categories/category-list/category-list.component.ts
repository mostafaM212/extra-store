import { CategoryService } from './../services/category.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import { Category } from '../modals/Category.modal';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  _unsubscribe$ = new Subject<boolean>();
  categories$ = new BehaviorSubject<Category[]>([]);
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .pipe(
        tap((data) => {
          console.log('test', data);

          this.categories$.next(data.categories);
        }),
        takeUntil(this._unsubscribe$)
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
