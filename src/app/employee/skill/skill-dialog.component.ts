import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'skill-dialog',
  templateUrl: './skill-dialog.html'
})
export class SkillDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SkillDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

}
