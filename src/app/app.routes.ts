import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    {
      path: '',
      component: LayoutComponent,
      children: [
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'login'
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
    }
  ];
