import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RegisterComponent } from '../register/register.component';
import { User } from '../types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, AsyncPipe, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  signUp = false;
  users: User[] = [];

  constructor(private http: HttpClient) { }

  signUpClickHandler() {
    this.signUp = true;
  }

  ngOnInit(): void {
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

  cancelRegisterMode(event: boolean) {
    this.signUp = event;
  }
}
