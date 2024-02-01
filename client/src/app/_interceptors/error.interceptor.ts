import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  const openSnackBar = (message: string) => {
    snackBar.open(message, "Close", { duration: 3000, horizontalPosition: "center", verticalPosition: "top", 
    panelClass: ['multiline-snackbar'] });
  }

  return next(req).pipe(catchError(error => {
    if (error) {
      if (error.status === 400) {
        if (typeof error.error === 'object') {
          const modelStateErrors = [];
          for (const key in error.error.errors) {
            if (error.error.errors[key]) {
              modelStateErrors.push(error.error.errors[key]);
            }
          }
          openSnackBar(modelStateErrors.join('\n\n'));
          throw modelStateErrors;
        }
        else if (typeof error.error === 'string') {
          if (error.error.startsWith("System.InvalidOperationException")) {
            openSnackBar("Invalid username or password");
          }
          else {
            openSnackBar(error.error);
          }
        }
      }
      else if (error.status === 401) {
        openSnackBar("Unauthorized");
        router.navigateByUrl('/');
      }
      else if (error.status === 404) {
        router.navigateByUrl('/not-found');
      }
      else if (error.status === 500) {
        const navigationExtras: NavigationExtras = { state: { error: error.error } };
        router.navigateByUrl('/server-error', navigationExtras);
      }
      else {
        openSnackBar("Something unexpected went wrong");
        console.log(error);
      }
    }
    return throwError(() => error);
  }));
};
