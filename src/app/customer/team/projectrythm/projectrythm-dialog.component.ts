import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'projectrythm-dialog',
  templateUrl: './projectrythm-dialog.html'
})
export class ProjectRythmDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProjectRythmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

}
