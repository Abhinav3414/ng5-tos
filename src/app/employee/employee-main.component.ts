import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EmployeeService } from './employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { EmployeeDialogComponent } from './employee-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'employee-main',
  templateUrl: './employee-main.html'
})
export class EmployeeMainComponent {
  employeesData = undefined;
  employees = [];
  isUpdate: boolean = true;
  employee: any;

  constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.employeeService.getEmployeesData()
      .then((resEmployeeData) => {
        this.employeesData = resEmployeeData;
        for (var i = 0; i < this.employeesData.length; i++) {
          this.employees.push(this.employeesData[i]);
        }
      });
  }

  openDialog(): void {
    let emp = this.employees[0];
    emp.id = 0;
    let dialogRef = this.dialog.open(EmployeeDialogComponent, {
      data: emp
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != 'dialogDismissed') {
        this.addNewEmployee(result)
      }
    });
  }

  openUpdateDialog(id: number): void {
    for (let key in this.employees) {
      if (this.employees[key].id === id) {
        this.employee = this.employees[key];
      }
    }
    let dialogRef = this.dialog.open(EmployeeDialogComponent, {
      data: this.employee
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != 'dialogDismissed') {
        this.updateEmployee(id, result);
      }
    });

  }

  addNewEmployee(employee) {
    this.employeeService.postEmployee(employee);
    setTimeout(() => {
      location.reload();
    }, 1000);
  }

  updateEmployee(id, employee) {
    this.employeeService.getEmployeeData(id)
      .then((resCustomerData) => {
        let emp = resCustomerData;
        emp.name = employee.name;
        emp.joiningDate = employee.joiningDate;
        emp.yearsOfExperience = employee.yearsOfExperience;
        emp.responsibilities = employee.responsibilities;
        this.employeeService.updateEmployee(emp);
      });

    setTimeout(() => {
      location.reload();
    }, 1000);
  }

  delelteEmployee(id) {
    this.employeeService.delelteEmployee(id);
    location.reload();
  }

  navigateViewEmployee(id) {
    this.router.navigate(['/employee-view', id], { skipLocationChange: true });
  }

}
