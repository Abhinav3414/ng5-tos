import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatInputModule],
  exports: [MatButtonModule, MatToolbarModule, MatIconModule, MatCardModule, MatInputModule]
})
export class MaterialModule { }
