import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'certification-dialog',
  templateUrl: './certification-dialog.html'
})
export class CertificationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CertificationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

}
