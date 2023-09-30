import { AuthGuard } from './services/guards/AuthGuard.guard';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/Home/nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './routes/home/home.component';
import { HeaderCardComponent } from './components/home/header-card/header-card.component';
import { HeaderBanalComponent } from './components/home/header-banal/header-banal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import * as ENV from '../environments/environment.prod';
import { HeaderPhotoComponent } from './components/home/header-photo/header-photo.component';
import { ProductComponentComponent } from './components/product/product-component/product-component.component';
import { CategorySectionComponent } from './components/home/category-section/category-section.component';
import { CategoryComponent } from './routes/category/category.component';
import { AppState } from './store/store';
import { SingleCategoryComponent } from './routes/category/single-category/single-category.component';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './routes/category/products/products.component';
import { FooterComponent } from './components/home/footer/footer.component';
import { ProductDetailsComponent } from './routes/product-details/product-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DataViewerComponent } from './components/data-viewer/data-viewer.component';
import { ErrorComponent } from './components/Auth/error/error.component';
import { AlertComponent } from './components/UI/alert/alert.component';
import { ToastrModule } from 'ngx-toastr';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { ErrorInterceptorInterceptor } from './interceptors/error-interceptor.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    HeaderCardComponent,
    HeaderBanalComponent,
    HeaderPhotoComponent,
    ProductComponentComponent,
    DataViewerComponent,
    CategorySectionComponent,
    CategoryComponent,
    SingleCategoryComponent,
    ProductsComponent,
    FooterComponent,
    ProductDetailsComponent,

    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot(AppState),
    StoreDevtoolsModule.instrument({ logOnly: ENV.environment.production }),
    FontAwesomeModule,
    AngularMaterialModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
