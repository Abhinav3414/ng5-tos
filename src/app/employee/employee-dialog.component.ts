import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'employee-dialog',
  templateUrl: './employee-dialog.html'
})
export class EmployeeDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EmployeeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

}
