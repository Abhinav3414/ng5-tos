import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'team-dialog',
  templateUrl: './team-dialog.html'
})
export class TeamDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TeamDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

}
