import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './core/auth/auth.guard';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        pathMatch: 'full',
        canActivate: [authGuard],
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
        title: 'Home'
      },
      {
        path: 'statistics',
        pathMatch: 'full',
        canActivate: [authGuard],
        loadComponent: () => import('./features/statistics/statistics.component').then(m => m.StatisticsComponent),
        title: 'Statistics'
      },
      {
        path: 'trades',
        pathMatch: 'full',
        canActivate: [authGuard],
        loadComponent: () => import('./features/trades/trades.component').then(m => m.TradesComponent),
        title: 'Trades'
      },
      {
        path: 'login',
        loadComponent: () => import('./features/auth-page/auth.component').then(m => m.AuthComponent),
        title: 'Login'
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth-page/auth.component').then(m => m.AuthComponent),
        title: 'Register'
      },
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: '404 - Page not found'
  }
];
