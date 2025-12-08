import { HttpInterceptorFn, HttpErrorResponse, HttpBackend, HttpClient } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const httpBackend = inject(HttpBackend);
  const http = new HttpClient(httpBackend); 

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status === 401) {

        return http.get(`${environment.baseUrl}/auth/api/v1/auth/check-session?aud=${environment.aud}&deviceType=WEB`, { withCredentials: true }).pipe(
          switchMap(res => {
            const newReq = req.clone();

            return next(newReq);
          }),
          catchError(() => {
            // session invalid → redirect
            window.location.href =
              `${environment.authServiceUrl}?redirectUrl=${environment.frontendBaseUrl}`;
            return throwError(() => error);
          })
        )
      }

      return throwError(() => error);
    })
  );
};
