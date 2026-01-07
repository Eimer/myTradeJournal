import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _apiService = inject(ApiService);
  private _userService = inject(UserService);
  private _router = inject(Router);
  constructor(

  ) {
  }

  signIn(email: string, password: string): Observable<any> {
    return this._apiService.signIn(email, password).pipe(
      tap((response: any) => {
        if (response && response.user) {
          const user = response.user;
          this._userService.setUser({
            id: user.id,
            email: user.email,
            displayName: user.user_metadata?.['display_name'] || 'Trader'
          });
        }
      }),
      catchError(err => throwError(() => err))
    );
  }

  signUp(email: string, password: string, displayName: string): Observable<any> {
    return this._apiService.signUp(email, password, displayName).pipe(
      tap((response) => {
        console.log('Sign up success:', response);
      }),
      catchError(err => throwError(() => err))
    );
  }

  logout(): Observable<any> {
    return this._apiService.signOut().pipe(
      finalize(() => {
        this._userService.setLoggedOut();
        this._router.navigate(['/login']);
      })
    );
  }

}
