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
  employeesData = undefined;
  employees = [];
  isUpdate: boolean = true;
  employee: any;
  employeeClass: any;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataService.getEntityAllData('employees')
      .then((resEmployeeData) => {
        this.employeesData = resEmployeeData;

        this.employeesData.forEach(e => this.employees.push(e));
      });
  }

  openDialog(): void {
    this.employeeClass = new Employee();

    let dialogRef = this.dialog.open(EmployeeDialogComponent, {
      data: this.employeeClass
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.addNewEmployee(result)
      }
    });
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
        this.updateEmployee(id, result);
      } else {
        this.employees[index] = employeeCopy;
      }
    });
  }

  addNewEmployee(employee) {
    console.log(employee)
    this.dataService.postEntity('employees', employee)
      .then((resCustomerData) => {
        this.employees.push(resCustomerData);
      },
      (err) => console.log("Employee could not be added :" + err)
      );
  }

  updateEmployee(id, employee) {
    this.dataService.updateEntity('employees', employee.id, employee)
      .then((resCustomerData) => {
        let index = this.employees.findIndex(e => e.id === employee.id);
        this.employees[index] = employee;
      },
      (err) => console.log("Employee could not be updated :" + err)
      );
  }

  delelteEmployee(id) {
    this.dataService.delelteEntity('employees', id)
      .then((resCustomerData) => {
        this.employees.splice(this.employees.findIndex(function(i) {
          return i.id === id;
        }), 1);
      },
      (err) => console.log("Customer could not be deleted :" + err)
      );
  }

  navigateViewEmployee(id) {
    this.router.navigate(['/employee-view', id], { skipLocationChange: true });
  }

}
