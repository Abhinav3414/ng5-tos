import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'goal-dialog',
  templateUrl: './goal-dialog.html'
})
export class GoalDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GoalDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

}
