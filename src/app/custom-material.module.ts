import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatCardModule, MatInputModule, MatIconModule,
    MatMenuModule, MatFormFieldModule, MatDialogModule, MatExpansionModule, MatAutocompleteModule, MatSelectModule],
  exports: [MatButtonModule, MatToolbarModule, MatCardModule, MatInputModule, MatIconModule,
    MatMenuModule, MatFormFieldModule, MatDialogModule, MatExpansionModule, MatAutocompleteModule, MatSelectModule]
})
export class CustomMaterialModule { }
