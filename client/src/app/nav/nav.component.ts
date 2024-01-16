import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AccountService } from '../_services/account.service';
import { LoginRequest } from '../types';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, FormsModule, MatInputModule,
    MatFormFieldModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  loginForm = new FormGroup({
    userName: new FormControl(),
    password: new FormControl()
  });

  constructor(public accountService: AccountService) { }

  ngOnInit(): void { }

  login() {
    this.accountService.login(this.loginForm.value as LoginRequest).subscribe({
      error: (error) => {
        console.log(error);
      }
    });
  }

  logout() {
    this.accountService.logout();
  }
}
