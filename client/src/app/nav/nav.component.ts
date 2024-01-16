import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

type User = {
  username: string;
  token: string;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  user: User | undefined;

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  login() {
    console.log(this.loginForm.value);
  }
}
