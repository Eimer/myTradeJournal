import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppUser, UserAuthStatus, UserAuthStatusType } from '../models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private _user$ = new BehaviorSubject<Partial<AppUser>>({ status: UserAuthStatus.waitAuth });
  public readonly user$ = this._user$.asObservable();
  private readonly _apiService = inject(ApiService);

  constructor() {

  }

  loadUser(): void {
    const token = localStorage.getItem('sb-access-token');
    
    if (!token) {
      this.setLoggedOut();
      return;
    }
    this._apiService.getUser().subscribe({
      next: (user: any) => {
        this.setUser({
          id: user.id,
          email: user.email,
          displayName: user.user_metadata?.['display_name'] || 'Trader'
        });
      },
      error: () => {
        this.setLoggedOut();
        localStorage.clear();
      }
    });
  }

  setUser(userData: Omit<AppUser, 'status'>): void {
    this._user$.next({
      ...userData,
      status: UserAuthStatus.loggedIn
    } as AppUser);
  }

  setLoggedOut(): void {
    this._user$.next({ status: UserAuthStatus.loggedOut });

    localStorage.removeItem('sb-access-token');
    localStorage.removeItem('sb-refresh-token');
  }

  getCurrentStatus(): UserAuthStatusType {
    return this._user$.getValue().status || UserAuthStatus.waitAuth;
  }

}
