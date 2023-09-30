import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, finalize, takeUntil, tap } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-category-list',
  templateUrl: './add-edit-category-list.component.html',
  styleUrls: ['./add-edit-category-list.component.css'],
})
export class AddEditCategoryListComponent implements OnInit, OnDestroy {
  _unsubscribe$ = new Subject<boolean>();
  isLoading: boolean = false;
  addMode: boolean = true;
  categoryForm = this.fb.group({
    name: ['', [Validators.required]],
    logo: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });
  constructor(
    private fb: UntypedFormBuilder,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  save() {
    if (this.categoryForm.invalid) {
      this.toastr.info('please enter an valid values', 'invalid data');
      return;
    }
    this.isLoading = true;
    if (this.addMode) {
      this.categoryService
        .addCategory(this.categoryForm.value)
        .pipe(
          tap((data) => {
            this.router.navigate(['category-list']);
          }),
          finalize(() => (this.isLoading = false)),
          takeUntil(this._unsubscribe$)
        )
        .subscribe();
    }
  }
  ngOnDestroy(): void {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }
}
