import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const snackBar = inject(MatSnackBar);
  console.log(route, state)
  
  return accountService.currentUser$.pipe(
    map(user => {
      if (user) return true;
      else {
        snackBar.open("You must be logged in to view this page", undefined, { 
          duration: 3000, 
          horizontalPosition: "center", 
          verticalPosition: "top",
         });

        return false;
      }
    })
  );
};
