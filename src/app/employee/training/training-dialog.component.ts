import { Component, Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'training-dialog',
  templateUrl: './training-dialog.html'
})
export class TrainingDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TrainingDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

}
