import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401) {
          this.toastr.error(error.error.message, 'Error');
        } else if (error.status == 403) {
          this.toastr.error(error.error.message, 'Error');
        } else {
          this.toastr.error(error.error.message, 'Error');
        }
        return throwError(error);
      })
    );
  }
}
