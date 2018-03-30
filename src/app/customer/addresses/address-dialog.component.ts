import { Component, Inject, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'address-dialog',
  templateUrl: './address-dialog.html'
})
export class AddressDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddressDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

}
