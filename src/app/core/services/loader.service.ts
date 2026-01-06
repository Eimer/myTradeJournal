import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _loading$ = new BehaviorSubject<boolean>(false);
  public readonly isLoading$ = this._loading$.asObservable();

  private _activeRequests = 0;

  show(): void {
    this._activeRequests++;
    this._loading$.next(true);
  }

  hide(): void {
    this._activeRequests--;
    if (this._activeRequests <= 0) {
      this._activeRequests = 0;
      this._loading$.next(false);
    }
  }

}
