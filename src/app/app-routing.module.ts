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
import { LoginComponent } from './routes/auth/login/login.component';
import { RegisterComponent } from './routes/auth/register/register.component';
import { UserComponent } from './routes/auth/user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
    resolve: { product: ProductResolverResolver },
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login - Extra Store',
    canActivate: [LoginGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register - Extra Store',
    canActivate: [LoginGuard],
  },
  {
    path: 'profile',
    component: UserComponent,
    title: 'Profile - Extra Store',
    canActivate: [AuthGuard],
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
