import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

import { EmployeeMainComponent } from '../employee/employee-main.component'
import { CustomerDialogComponent } from './customer-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Location } from '@angular/common';

const dummyDialogEntity = { id: 0, name: "dummy" };

@Component({
  selector: 'customer-main',
  templateUrl: './customer-main.html'
})
export class CustomerMainComponent {
  customers = [];
  customer: any;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog, private location: Location) {
  }

  ngOnInit() {

    this.dataService.getEntityAllData('customers')
      .then((resCustomerData) => {
        for (var i = 0; i < resCustomerData.length; i++) {
          this.customers.push(resCustomerData[i]);
        }
      });

  }

  openDialog(): void {
    let dialogRef = this.dialog.open(CustomerDialogComponent, {
      data: dummyDialogEntity
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.addNewCustomer(result)
      }
    });
  }

  openUpdateDialog(id: number): void {
    for (let key in this.customers) {
      if (this.customers[key].id === id) {
        this.customer = this.customers[key];
      }
    }

    let dialogRef = this.dialog.open(CustomerDialogComponent, {
      data: this.customer
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.updateCustomer(id, result);
      }
    });

  }

  updateCustomer(id, customer) {
    this.dataService.getEntityData('customers', id)
      .then((resCustomerData) => {
        this.customer = resCustomerData;
        this.customer.name = customer.name;
        this.customer.contact = customer.contact;
        this.customer.contactPerson = customer.contactPerson;
        this.customer.domain = customer.domain;
        let tempCust = this.customer;
        this.dataService.updateEntity('customers', this.customer.id, this.customer)
          .then((resCustomerData) => {
            let index;
            this.customers.forEach(function(cust, i) {
              if (cust.id === tempCust.id)
                index = i;
            });
            this.customers[index] = tempCust;
          },
          (err) => console.log("Customer " + customer.name + " could not be updated :" + err)
          );
      });
  }

  addNewCustomer(customer) {
    this.dataService.postEntity('customers', customer)
      .then((resCustomerData) => {
        this.customers.push(resCustomerData);
      },
      (err) => console.log("Customer " + customer.name + " could not be added :" + err)
      );
  }

  deleteCustomer(id) {
    this.dataService.delelteEntity('customers', id)
      .then((resCustomerData) => {
        this.customers.splice(this.customers.findIndex(function(i) {
          return i.id === id;
        }), 1);
      },
      (err) => console.log("Customer could not be deleted :" + err)
      );
  }

  navigateViewCustomer(id) {
    this.router.navigate(['/customer-view', id], { skipLocationChange: true });
  }

}
