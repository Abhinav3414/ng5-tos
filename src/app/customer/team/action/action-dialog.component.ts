import { Component, Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'action-dialog',
  templateUrl: './action-dialog.html'
})
export class ActionDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ActionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

}
