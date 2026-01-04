import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SupabaseService } from '../services/supabase.service';
import { AuthResponse, User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user = new BehaviorSubject<User | null>(null);

  constructor(
    private supabaseService: SupabaseService
  ) {

    from(this.supabaseService.getSession())
      .pipe(
        tap(({ data }) => this._user.next(data.session?.user ?? null)),
        catchError(err => {
          console.error('Error getting session:', err);
          return throwError(() => err);
        })
      )
      .subscribe();

      this.supabaseService.onAuthStateChange((_event, session) => {
        this._user.next(session?.user ?? null);
      });

  }

  get user$(): Observable<User | null> {
    return this._user.asObservable();
  }

  signUp(email: string, password: string): Observable<AuthResponse> {
    return from(this.supabaseService.signUp(email, password)).pipe(
      tap(({ error }) => {
        if (error) throw error;
      }),
      catchError(err => {
        console.error('SignUp error:', err);
        return throwError(() => err);
      }),
      tap(() => {})
    );
  }

  signIn(email: string, password: string): Observable<AuthResponse> {
    return from(this.supabaseService.signIn(email, password)).pipe(
      tap(({ error }) => {
        if (error) throw error;
      }),
      catchError(err => {
        console.error('SignIn error:', err);
        return throwError(() => err);
      }),
      tap(() => {})
    );
  }

  signOut(): Observable<any> {
    return from(this.supabaseService.signOut()).pipe(
      tap(({ error }) => {
        if (error) throw error;
        this._user.next(null);
      }),
      catchError(err => {
        console.error('SignOut error:', err);
        return throwError(() => err);
      }),
      tap(() => {})
    );
  }

  getCurrentUser(): User | null {
    return this._user.value;
  }
}
