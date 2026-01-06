import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { delay, finalize, tap } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {

  const loaderService = inject(LoaderService);

  loaderService.show();

  return next(req).pipe(
    delay(2000),
    tap( () => {
      console.log();
      
    } ),
    finalize(() => loaderService.hide())
  );
};
