import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@stockeer/services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!request.headers.has('Authorization')) {
      request = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${this.authService.authToken ?? ''}`
        ),
      });
    }
    return next.handle(request);
  }
}
