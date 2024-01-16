import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../types';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  private currentUserSource = new BehaviorSubject<LoginResponse | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.baseUrl + 'account/login', model).pipe(
      map((response: LoginResponse) => {
        if (response) {
          localStorage.setItem('loginDetails', JSON.stringify(response));
          this.currentUserSource.next(response);
        }
        return response;
      })
    );
  }

  setCurrentUser(loginDetails: LoginResponse | null) {
    this.currentUserSource.next(loginDetails);
  }

  logout() {
    localStorage.removeItem('loginDetails');
    this.currentUserSource.next(null);
  }
}
