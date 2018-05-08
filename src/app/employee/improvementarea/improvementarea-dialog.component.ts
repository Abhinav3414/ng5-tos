import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'improvementarea-dialog',
  templateUrl: './improvementarea-dialog.html'
})
export class ImprovementAreaDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ImprovementAreaDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

}
