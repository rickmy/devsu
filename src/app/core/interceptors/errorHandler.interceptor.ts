import type { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '@shared/services/toast.service';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      debugger
      if(error.error instanceof ErrorEvent) {
        toast.openToast({ severity: 'error', detail: error.error.message });
      } else {
        toast.openToast({ severity: 'error', detail: 'Ah ocurrido un error. ' });
      }
      return throwError(()=> error);
    })
  );
};
