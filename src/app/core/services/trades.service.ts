import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { Trade } from '../models/trades.model';

@Injectable({
  providedIn: 'root',
})
export class TradesService {
  private _api = inject(ApiService);

  getTrades(): Observable<Trade[]> {
    return this._api.getTableData<Trade>('Trades').pipe(
      map(trades => trades.sort((a, b) =>
        new Date(b.openTime).getTime() - new Date(a.openTime).getTime()
      ))
    );
  }

}
