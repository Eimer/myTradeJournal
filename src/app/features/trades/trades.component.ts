import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Trade, TradeType } from '../../core/models/trades.model';

@Component({
  selector: 'app-trades',
  imports: [CommonModule, MatTableModule],

  templateUrl: './trades.component.html',
  styleUrl: './trades.component.scss',
})
export class TradesComponent {

  protected readonly TradeType = TradeType;

  dataSource: Trade[] = [
    {
      asset: 'BTC/USDT',
      type: TradeType.LONG,
      duration: '2h 15m',
      openTime: new Date(2025, 0, 12, 10, 0),
      closeTime: new Date(2025, 0, 12, 12, 15),
      pnl: 150.50
    },
    {
      asset: 'ETH/USDT',
      type: TradeType.SHORT,
      duration: '45m',
      openTime: new Date(2025, 0, 12, 14, 30),
      closeTime: new Date(2025, 0, 12, 15, 15),
      pnl: -40.20
    }
  ];

  columnsToDisplay = ['asset', 'type', 'duration', 'pnl'];
  expandedElement: Trade | null = null;
}

