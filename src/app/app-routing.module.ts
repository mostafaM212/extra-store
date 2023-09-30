import { LoginGuard } from './services/guards/LoginGuard.guard';
import { AuthGuard } from './services/guards/AuthGuard.guard';
import { ProductDetailsComponent } from './routes/product-details/product-details.component';
import { ProductsForCategoryResolver } from './services/resolvers/ProductsForCategoryResolver.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './routes/category/category.component';
import { ProductsComponent } from './routes/category/products/products.component';
import { SingleCategoryComponent } from './routes/category/single-category/single-category.component';
import { HomeComponent } from './routes/home/home.component';
import { ProductResolverResolver } from './services/resolvers/product-resolver.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
    resolve: { product: ProductResolverResolver },
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./routes/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'category-list',
    loadChildren: () =>
      import('./categories/categories.module').then((m) => m.CategoriesModule),
  },
  {
    path: 'category',
    component: CategoryComponent,
    title: 'Category - Extra Store',
    children: [
      {
        path: '',
        component: ProductsComponent,
        title: 'All Products - Extra Store',
      },
      {
        path: ':id',
        component: SingleCategoryComponent,
        resolve: { products: ProductsForCategoryResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
