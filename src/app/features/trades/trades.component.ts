import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Trade, TradeType } from '../../core/models/trades.model';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TradesService } from '../../core/services/trades.service';

@Component({
  selector: 'app-trades',
  imports: [CommonModule, MatTableModule, MatChipsModule, MatIconModule],

  templateUrl: './trades.component.html',
  styleUrl: './trades.component.scss',
})
export class TradesComponent {
  private _tradeService = inject(TradesService);
  public trades$ = this._tradeService.getTrades();
  public TradeType = TradeType;

  columnsToDisplay = ['asset', 'type', 'duration', 'pnl', 'screenshot'];
  expandedElement: Trade | null = null;
}

