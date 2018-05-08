import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'stakeholder-dialog',
  templateUrl: './stakeholder-dialog.html'
})
export class StakeholderDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<StakeholderDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

}
