import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  exports: [
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
  ],
})
export class AngularMaterialModule {}
