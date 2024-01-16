import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavComponent } from "./nav/nav.component";
import { LoginResponse } from './types';
import { AccountService } from './_services/account.service';
import { HomeComponent } from './home/home.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, HttpClientModule, NavComponent, HomeComponent]
})
export class AppComponent implements OnInit {
  title = 'Dating App';

  constructor(private http: HttpClient, private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const loginDetails: LoginResponse = JSON.parse(localStorage.getItem('loginDetails') || '{}');
    if (loginDetails.username) {
      this.accountService.setCurrentUser(loginDetails);
    }
  }
}
