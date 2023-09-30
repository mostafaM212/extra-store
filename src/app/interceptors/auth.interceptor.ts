import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/AuthService.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const httpHeader: HttpHeaders = new HttpHeaders();
    if (this.authService.isAuthenticated$.getValue()) {
      const authRequest = request.clone({
        headers: request.headers.set(
          'Authorization',
          this.authService.token$.getValue() as string
        ),
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }
}
