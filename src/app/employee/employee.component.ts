import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from './employee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'employee',
  templateUrl: './employee.html'
})
export class EmployeeComponent {
  id: number;
  employeesData = undefined;
  isUpdate:boolean = true;

  constructor(private employeeService:EmployeeService,private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
         this.id = +params['id']; // (+) converts string 'id' to a number
        if(!isNaN(this.id)){
          this.isUpdate=false;
          this.employeeService.getEmployeeData(this.id)
          .then((resEmployeeData) => {
            this.employeesData = resEmployeeData;
          });
        }
      });
    }

  addNewEmployee(employee) {
    this.employeeService.postEmployee(employee);
    setTimeout(() => {
        location.reload();
    }, 1000);
  }

  updateEmployee(employee) {
    employee.id=this.id;
    this.employeeService.updateEmployee(employee);
    setTimeout(() => {
        location.reload();
    }, 1000);
  }

  resetForm(form: NgForm) {
    form.reset();
  }


}
