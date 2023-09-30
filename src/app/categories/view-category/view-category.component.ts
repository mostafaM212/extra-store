import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../modals/Category.modal';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css'],
})
export class ViewCategoryComponent implements OnInit {
  _unsubscribe$ = new Subject<boolean>();
  category$ = new BehaviorSubject<Category | null>(null);
  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      if (data['id']) {
        this.getCategory(data['id']);
      }
    });
  }

  getCategory(id: string) {
    this.categoryService
      .getCategory(id)
      .pipe(
        tap((data) => {
          console.log('test', data);

          this.category$.next(data.category);
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
