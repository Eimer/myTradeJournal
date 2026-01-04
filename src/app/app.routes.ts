import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: 'login',
      loadComponent: () => import('./features/auth-page/auth.component')
        .then(m => m.AuthComponent)
    },
    {
      path: 'register',
      loadComponent: () => import('./features/auth-page/auth.component')
        .then(m => m.AuthComponent)
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
]
