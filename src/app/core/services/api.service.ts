import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { from, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _http = inject(HttpClient);

  private readonly url = environment.supabaseUrl;
  private readonly key = environment.supabaseKey;

  private readonly headers = new HttpHeaders({
    'apikey': this.key,
    'Content-Type': 'application/json'
  });

  constructor() {
  }

  signUp(email: string, password: string, displayName: string): Observable<any> {
    const body = {
      email,
      password,
      data: { display_name: displayName }
    };
    return this._http.post(`${this.url}/auth/v1/signup`, body, { headers: this.headers });
  }

  signIn(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this._http.post(`${this.url}/auth/v1/token?grant_type=password`, body, { headers: this.headers })
      .pipe(
        tap((response: any) => {
          if (response.access_token) {
            localStorage.setItem('sb-access-token', response.access_token);
            localStorage.setItem('sb-refresh-token', response.refresh_token);
          }
        })
      );
  }

  signOut(): Observable<any> {
    const token = localStorage.getItem('sb-access-token');
    const headers = this.headers.set('Authorization', `Bearer ${token}`);

    return this._http.post(`${this.url}/auth/v1/logout`, {}, { headers })
      .pipe(
        tap(() => {
          localStorage.removeItem('sb-access-token');
          localStorage.removeItem('sb-refresh-token');
        })
      );
  }

  getSession(): Observable<any> {
    const session = localStorage.getItem('sb-access-token');
    return new Observable(observer => {
      observer.next(session ? { access_token: session } : null);
      observer.complete();
    });
  }
}
