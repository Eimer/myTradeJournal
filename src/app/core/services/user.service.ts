import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private _user$ = new BehaviorSubject<AppUser | null>(null);
  public readonly user$ = this._user$.asObservable();

  constructor() {

  }

  setUser(user: any): void {
    console.log('UserService: User updated', user);
    this._user$.next(user);
  }

  clearUser(): void {
    console.log('UserService: User cleared');
    this._user$.next(null);
  }

  getCurrentUserValue(): any | null {
    return this._user$.getValue();
  }

}
