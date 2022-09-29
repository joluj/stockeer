import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import {
  BehaviorSubject,
  firstValueFrom,
  ignoreElements,
  map,
  Observable,
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

  private _authToken$ = new BehaviorSubject<string | null>(null);

  public get authToken(): string | null {
    return this._authToken$.value;
  }

  public get authenticated(): Observable<boolean> {
    return this._authToken$.pipe(map((token) => !!token));
  }

  public async logout() {
    await this.storage.remove(AUTH_TOKEN_KEY);
    this._authToken$.next(null);
  }

  public async validateAuthentication(): Promise<boolean> {
    try {
      const token = await this.storage.get(AUTH_TOKEN_KEY);
      if (!token) return false;

      await firstValueFrom(
        this.http.get<void>('/api/auth/validate', {
          headers: { Authorization: `Bearer ${token}` },
        })
      );

      this._authToken$.next(token);
      return true;
    } catch (e) {
      if (
        e instanceof HttpErrorResponse &&
        e.status === HttpStatusCode.Unauthorized
      ) {
        // Ignore this
        return false;
      }

      console.error(e);
      return false;
    }
  }

  public authenticate(args: {
    username: string;
    password: string;
  }): Observable<void> {
    return this.http.post<JwtResponseDto>('/api/auth/login', args).pipe(
      tap((request) => {
        this._authToken$.next(request.accessToken);
        this.storage.set(AUTH_TOKEN_KEY, this.authToken);
      }),
      ignoreElements()
    );
  }
}
