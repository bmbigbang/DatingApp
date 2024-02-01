import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { SharedModule } from '../../_modules/shared.module';

@Component({
  selector: 'app-server-error',
  standalone: true,
  imports: [SharedModule, FormsModule, ReactiveFormsModule, AsyncPipe, RouterOutlet, RouterLink, NgIf, CommonModule],
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.scss'
})
export class ServerErrorComponent {
  error: any;
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.error = navigation?.extras?.state?.['error'];
  }
}
