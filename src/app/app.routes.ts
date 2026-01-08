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
          canActivate: [authGuard],
          loadComponent: () => import('./features/home/home/home.component').then(m => m.HomeComponent)
        },
        {
          path: 'login',
          loadComponent: () => import('./features/auth-page/auth.component').then(m => m.AuthComponent)
        },
        {
          path: 'register',
          loadComponent: () => import('./features/auth-page/auth.component').then(m => m.AuthComponent)
        },
      ]
    },
    {
      path: '**',
      loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
      title: '404 - Page not found'
    }
  ];
