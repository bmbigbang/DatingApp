import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AccountService } from '../_services/account.service';
import { LoginRequest } from '../types';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, FormsModule, MatInputModule,
    MatFormFieldModule, ReactiveFormsModule, AsyncPipe, RouterOutlet, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  loginForm = new FormGroup({
    userName: new FormControl(),
    password: new FormControl()
  });

  constructor(public accountService: AccountService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  login() {
    this.accountService.login(this.loginForm.value as LoginRequest).subscribe({
      next: () => this.router.navigateByUrl('/members'),
      error: error => {
        console.log(error);
        if (typeof error.error === 'object') {
          for (let e of Object.values(error.error.errors) as any[]) {
            this.openSnackBar(e[0]);
          };
        }
        else if (typeof error.error === 'string') {
          if (error.error.startsWith("System.InvalidOperationException")) {
            this.openSnackBar("Invalid username or password");
          }
          else {
            this.openSnackBar(error.error);
          }
        }
      }
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Close", { duration: 3000, horizontalPosition: "center", verticalPosition: "top" });
  }
}
