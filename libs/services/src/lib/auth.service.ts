import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import {
  catchError,
  EMPTY,
  from,
  ignoreElements,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { JwtResponseDto } from '@stockeer/dtos';

const AUTH_TOKEN_KEY = 'AUTH_TOKEN';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly storage: Storage
  ) {}
  private _authToken: string | null = null;

  public get authToken(): string | null {
    return this._authToken;
  }

  public authenticate(): Observable<void> {
    return from(
      this.storage
        .get(AUTH_TOKEN_KEY)
        .then((token) => {
          this._authToken = token;
        })
        .catch((e) => {
          console.error(e);
        })
    ).pipe(
      switchMap(() => {
        return this.http.get<void>('/api/auth/validate').pipe(
          catchError((err) => {
            if (
              err instanceof HttpErrorResponse &&
              err.status === HttpStatusCode.Unauthorized
            ) {
              const username = prompt('Username');
              const password = prompt('Password');

              return this.http
                .post<JwtResponseDto>('/api/auth/login', {
                  username,
                  password,
                })
                .pipe(
                  tap((request) => {
                    this._authToken = request.accessToken;
                    this.storage.set(AUTH_TOKEN_KEY, this.authToken);
                  })
                );
            }
            console.log(err);
            alert('Auth failed');
            return EMPTY;
          }),
          ignoreElements()
        );
      })
    );
  }
}
