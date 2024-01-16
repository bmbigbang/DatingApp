import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavComponent } from "./nav/nav.component";
import { LoginResponse, User } from './types';
import { AccountService } from './_services/account.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, HttpClientModule, NavComponent]
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  users: User[] = [];

  constructor(private http: HttpClient, private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.setCurrentUser();
    this.getUsers();
  }

  getUsers() {
    this.http.get<User>('https://localhost:5001/api/users').subscribe({
      next: (response: any) => {
        this.users = response;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {}
    })
  }

  setCurrentUser() {
    const loginDetails: LoginResponse = JSON.parse(localStorage.getItem('loginDetails') || '{}');
    if (loginDetails.username) {
      this.accountService.setCurrentUser(loginDetails);
    }
  }
}
