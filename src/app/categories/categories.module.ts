import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { AddEditCategoryListComponent } from './add-edit-category-list/add-edit-category-list.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CategoryService } from '../services/CategoriesService.service';
import { HttpClientModule } from '@angular/common/http';
import { ViewCategoryComponent } from './view-category/view-category.component';

@NgModule({
  declarations: [CategoryListComponent, AddEditCategoryListComponent, ViewCategoryComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class CategoriesModule {
  static forRoot(): ModuleWithProviders<CategoriesModule> {
    return {
      ngModule: CategoriesModule,
      providers: [CategoryService],
    };
  }
}
