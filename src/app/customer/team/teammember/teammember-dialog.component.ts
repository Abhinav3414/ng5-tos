import { Component, Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'teammember-dialog',
  templateUrl: './teammember-dialog.html'
})
export class TeamMemberDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TeamMemberDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

}
