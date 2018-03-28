import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EmployeeService } from './employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'employee-main',
  templateUrl: './employee-main.html'
})
export class EmployeeMainComponent {
  employeesData = undefined;
  employees = [];

  constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.employeeService.getEmployeesData()
      .subscribe(resEmployeeData => {
        this.employeesData = resEmployeeData;
        for (var i = 0; i < this.employeesData.length; i++) {
          this.employees.push(this.employeesData[i]);
        }
      });

  }

  delelteEmployee(id) {
    this.employeeService.delelteEmployee(id);
    location.reload();
  }

  navigateUpdateEmployee(id) {
    this.router.navigate(['/employee', id], { skipLocationChange: true });
  }

  navigateNewEmployee() {
    this.router.navigate(['/employee/new'], { skipLocationChange: true });
  }

  navigateViewEmployee(id) {
    this.router.navigate(['/employee-view', id], { skipLocationChange: true });
  }

}
