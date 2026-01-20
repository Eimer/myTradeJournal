import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { finalize, from, map, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _http = inject(HttpClient);

  private readonly url = environment.supabaseUrl;
  private readonly key = environment.supabaseKey;

  private readonly _headers = new HttpHeaders({
    'apikey': this.key,
    'Content-Type': 'application/json'
  });

  constructor() {
  }

  private get _authHeaders(): HttpHeaders {
    const token = localStorage.getItem('sb-access-token');
    let headers = this._headers;

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers.set('Prefer', 'return=representation');
  }


  signUp(email: string, password: string, displayName: string): Observable<any> {
    const body = {
      email,
      password,
      data: { display_name: displayName }
    };
    return this._http.post(`${this.url}/auth/v1/signup`, body, { headers: this._headers });
  }

  signIn(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this._http.post(`${this.url}/auth/v1/token?grant_type=password`, body, { headers: this._headers })
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
    return this._http.post(`${this.url}/auth/v1/logout`, {}, { headers: this._authHeaders })
      .pipe(
        finalize(() => {
          localStorage.removeItem('sb-access-token');
          localStorage.removeItem('sb-refresh-token');
        })
      );
  }

  getUser(): Observable<any> {
    if (!localStorage.getItem('sb-access-token')) {
      return from([null]);
    }
    return this._http.get(`${this.url}/auth/v1/user`, { headers: this._authHeaders });
  }

  getSession(): Observable<any> {
    const token = localStorage.getItem('sb-access-token');
    return of(token ? { access_token: token } : null);
  }

  getTableData<T>(tableName: string): Observable<T[]> {

    return this._http.get<T[]>(`${this.url}/rest/v1/${tableName}`, {
      headers: this._authHeaders,
      params: {
        select: '*'
      }
    });
  }

}
