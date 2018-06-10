import { Component, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { DataService } from '../services/data.service';
import { UtilityService } from '../services/utility.service';

import { EmployeeDialogComponent } from './employee-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Employee } from './employee';
import { BreadCrumb } from '../menu/breadCrumb';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'employee-main',
  templateUrl: './employee-main.html',
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate('200ms ease-in')
      ])
    ])
  ]
})
export class EmployeeMainComponent {
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  employees = [];
  employee = new Employee();
  bread: BreadCrumb;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog, private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.utilityService.currentBreadCrumb.subscribe(bread => this.bread = bread);
    this.dataService.getEntityAllData('employees')
      .then((resEmployeeData) => {
        resEmployeeData.forEach(e => this.employees.push(e));
      },
      (err) => console.log("employees could not be fetched :" + err)
      );
  }

  openDialog(): void {
    this.employee = new Employee();
    let dialogRef = this.dialog.open(EmployeeDialogComponent, {
      data: this
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.addNewEntity('employees', result, this.employees)
      }
    });
  }

  addNewEntity(entityName, entity, entityArray) {
    this.dataService.postEntity(entityName, entity)
      .then((resEmployeeData) => {
        entityArray.push(resEmployeeData);
      },
      (err) => console.log(entityName + " could not be added :" + err)
      );
  }

  openUpdateDialog(id: number): void {
    const index = this.employees.findIndex(e => e.id === id);
    this.employee = this.employees[index];
    var employeeCopy = Object.assign({}, this.employee);

    let dialogRef = this.dialog.open(EmployeeDialogComponent, {
      data: this
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
      .then((resEmployeeData) => {
        let index = entityArray.findIndex(e => e.id === entity.id);
        entityArray[index] = entity;
      },
      (err) => console.log(entityName + " could not be updated :" + err)
      );
  }

  delelteEmployee(id) {
    let entity = this.employees[this.employees.findIndex(e => e.id === id)];
    if (entity.teamMembers.length > 0) {
      alert("Please unassign employee from all teams before deleting");
    }
    else {
      this.dataService.delelteEntity('employees', id)
        .then((resEmployeeData) => {
          this.employees.splice(this.employees.findIndex(function(i) {
            return i.id === id;
          }), 1);
        },
        (err) => console.log("Employee could not be deleted :" + err)
        );
    }
  }

  navigateViewEmployee(id) {
    let entity = this.employees[this.employees.findIndex(e => e.id === id)];
    this.utilityService.addBreadCrumb(2, '', 'view/employee', id, 'entity', entity.name);
    this.router.navigate(['view/employee', id], { skipLocationChange: false });
  }

  checkEntity(entity) {
    return this.utilityService.checkEntity(entity);
  }

}
