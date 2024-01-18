import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [],
  imports: [
    CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule
  ],
  exports: [
    MatToolbarModule, MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule
  ]
})
export class SharedModule { }
