import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegistrationRequest, User } from '../types';
import { AccountService } from '../_services/account.service';


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

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {

  }

  register() {
    this.accountService.register(this.registrationForm.value as RegistrationRequest).subscribe({
      next: response => {
        console.log(response),
          this.cancel();
      },
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
