import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from '../../../core/auth/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { filter, take, tap } from 'rxjs';
import { LoaderService } from '../../../core/services/loader.service';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule, MatIconModule, MatListModule, MatButtonModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  @Output() closeSidenav = new EventEmitter<void>();

  loaderService = inject(LoaderService);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  constructor() {
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntilDestroyed(),
      tap(() => this.closeSidenav.emit())
    ).subscribe();
  }

  onCloseClick() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this._authService.logout().pipe(
      take(1),
      tap(() => this.onCloseClick()),
    ).subscribe();
  }

}
