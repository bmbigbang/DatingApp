import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { LoginRequest } from '../types';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SharedModule } from '../_modules/shared.module';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [SharedModule, FormsModule, ReactiveFormsModule, AsyncPipe, RouterOutlet, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  loginForm = new FormGroup({
    userName: new FormControl(),
    password: new FormControl()
  });

  constructor(public accountService: AccountService, private router: Router) { }

  ngOnInit(): void { }

  login() {
    this.accountService.login(this.loginForm.value as LoginRequest).subscribe({
      next: () => this.router.navigateByUrl('/members'),
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
