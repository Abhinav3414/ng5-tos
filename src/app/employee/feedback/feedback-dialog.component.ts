import { Component, Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'feedback-dialog',
  templateUrl: './feedback-dialog.html'
})
export class FeedbackDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FeedbackDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

}
