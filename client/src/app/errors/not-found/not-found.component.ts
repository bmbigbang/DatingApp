import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SharedModule } from '../../_modules/shared.module';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [SharedModule, FormsModule, ReactiveFormsModule, AsyncPipe, RouterOutlet, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

}
