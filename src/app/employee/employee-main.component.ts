import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { DataService } from '../services/data.service';
import { EmployeeDialogComponent } from './employee-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Employee } from './employee';

const dummyDialogEntity = { id: 0, name: "dummy" };

@Component({
  selector: 'employee-main',
  templateUrl: './employee-main.html'
})
export class EmployeeMainComponent {
  employees = [];
  employee: any;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataService.getEntityAllData('employees')
      .then((resEmployeeData) => {
        resEmployeeData.forEach(e => this.employees.push(e));
      });
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(EmployeeDialogComponent, {
      data: new Employee()
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.addNewEntity('employees', result, this.employees)
      }
    });
  }

  addNewEntity(entityName, entity, entityArray) {
    this.dataService.postEntity(entityName, entity)
      .then((resCustomerData) => {
        entityArray.push(resCustomerData);
      },
      (err) => console.log(entityName + " could not be added :" + err)
      );
  }

  openUpdateDialog(id: number): void {
    const index = this.employees.findIndex(e => e.id === id);
    this.employee = this.employees[index];
    var employeeCopy = Object.assign({}, this.employee);

    let dialogRef = this.dialog.open(EmployeeDialogComponent, {
      data: this.employee
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.updateEntity('employees', id, result, this.employees);
      } else {
        this.employees[index] = employeeCopy;
      }
    });
  }

  updateEntity(entityName, id, entity, entityArray) {
    this.dataService.updateEntity(entityName, id, entity)
      .then((resCustomerData) => {
        let index = entityArray.findIndex(e => e.id === entity.id);
        entityArray[index] = entity;
      },
      (err) => console.log(entityName + " could not be updated :" + err)
      );
  }

  delelteEmployee(id) {
    this.dataService.delelteEntity('employees', id)
      .then((resCustomerData) => {
        this.employees.splice(this.employees.findIndex(function(i) {
          return i.id === id;
        }), 1);
      },
      (err) => console.log("Employee could not be deleted :" + err)
      );
  }

  navigateViewEmployee(id) {
    this.router.navigate(['/employee-view', id], { skipLocationChange: true });
  }

}
