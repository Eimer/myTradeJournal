import { inject } from '@angular/core';
import { filter, map, take } from 'rxjs/operators';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserAuthStatus } from '../models/user.model';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.user$.pipe(
    filter(user => !!user && user.status !== UserAuthStatus.waitAuth),
    take(1), 
    map(user => {
      if (user?.status === UserAuthStatus.loggedIn) {
        return true;
      } else {
        return router.createUrlTree(['/login'], { 
          queryParams: { returnUrl: state.url } 
        });
      }
    })
  );
};
