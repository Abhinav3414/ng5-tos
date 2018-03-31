import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomerService } from './customer.service';

import { CustomerDialogComponent } from './customer-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'customer-main',
  templateUrl: './customer-main.html'
})
export class CustomerMainComponent {
  customers = [];
  customer : any;

  constructor(private customerService:CustomerService, private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog) {
  }

  ngOnInit() {

    this.customerService.getCustomersData()
    .then((resCustomerData) => {
      for(var i = 0; i < resCustomerData.length; i++) {
         this.customers.push(resCustomerData[i]);
       }
    });

  }

  openDialog(): void {
    let cust = this.customers[0];
    cust.id = 0;
    let dialogRef = this.dialog.open(CustomerDialogComponent, {
      data: cust
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != 'dialogDismissed') {
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
      if (result != 'dialogDismissed') {
        this.updateCustomer(id, result);
      }
    });

  }

  updateCustomer(id, customer) {
    this.customerService.getCustomerData(id)
    .then((resCustomerData) => {
      this.customer = resCustomerData;
      this.customer.name = customer.name;
      this.customer.contact = customer.contact;
      this.customer.contactPerson = customer.contactPerson;
      this.customer.domain = customer.domain;
      this.customerService.updateCustomer(this.customer);
    });

    setTimeout(() => {
        location.reload();
    }, 1000);

  }


  addNewCustomer(customer) {
    this.customerService.postCustomer(customer);
    location.reload();
  }

  deleteCustomer(id) {
    this.customerService.delelteCustomer(id);
    location.reload();
  }

  navigateUpdateCustomer(id) {
    this.router.navigate(['/customer', id], { skipLocationChange: true });
  }

  navigateNewCustomer() {
    this.router.navigate(['/customer/new'], { skipLocationChange: true });
  }

  navigateViewCustomer(id) {
    this.router.navigate(['/customer-view', id], { skipLocationChange: true });
  }

}
