import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegistrationRequest, User } from '../types';
import { AccountService } from '../_services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  @Input() usersFromHomeComponent: User[] = [];
  @Output() cancelRegister = new EventEmitter();

  registrationForm = new FormGroup({
    userName: new FormControl(),
    password: new FormControl()
  });

  constructor(private accountService: AccountService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  register() {
    this.accountService.register(this.registrationForm.value as RegistrationRequest).subscribe({
      next: response => {
        console.log(response),
          this.cancel();
      },
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

  cancel() {
    this.cancelRegister.emit(false);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Close", { duration: 3000, horizontalPosition: "center", verticalPosition: "top" });
  }
}
