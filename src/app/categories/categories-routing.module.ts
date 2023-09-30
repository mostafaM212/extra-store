import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { AddEditCategoryListComponent } from './add-edit-category-list/add-edit-category-list.component';
import { ViewCategoryComponent } from './view-category/view-category.component';

const routes: Routes = [
  { path: '', component: CategoryListComponent },
  { path: 'add', component: AddEditCategoryListComponent },
  { path: 'edit/:id', component: AddEditCategoryListComponent },
  { path: 'view/:id', component: ViewCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
