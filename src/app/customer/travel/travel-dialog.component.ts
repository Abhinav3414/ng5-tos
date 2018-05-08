import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'travel-dialog',
  templateUrl: './travel-dialog.html'
})
export class TravelDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TravelDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

}
