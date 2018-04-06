import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

import { CustomerDialogComponent } from './customer-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Customer } from './customer';
import { BreadCrumb } from '../menu/breadCrumb';
import { Address } from './addresses/address';

@Component({
  selector: 'customer-main',
  templateUrl: './customer-main.html'
})
export class CustomerMainComponent {
  customers = [];
  customer = new Customer();
  customerAddress = new Address();

  bread: BreadCrumb;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataService.currentBreadCrumb.subscribe(bread => this.bread = bread);

    this.dataService.getEntityAllData('customers')
      .then((resCustomerData) => {
        resCustomerData.forEach(e => this.customers.push(e));
      });
  }

  openDialog(): void {
    this.customer = new Customer();
    this.customerAddress = new Address();
    let dialogRef = this.dialog.open(CustomerDialogComponent, {
      data: this
    });

    dialogRef.afterClosed().subscribe(result => {
      var addCustomer = false;
      if (result !== 'dialogDismissed' && result !== undefined) {
        if (result.customerAddress.address.length > 0 || (result.customerAddress.country.length > 0)) {
          console.log("changed")
          this.customerAddress = result.customerAddress;
          addCustomer = true;
        }
        this.addNewEntity('customers', result.customer, this.customers, addCustomer)
      }
    });
  }

  addNewEntity(entityName, entity, entityArray, addCustomer) {
    this.dataService.postEntity(entityName, entity)
      .then((resCustomerData) => {
        entityArray.push(resCustomerData);

          /* logic to add address for customer*/
        if (addCustomer == true) {
          this.customerAddress.customerId = resCustomerData.id;

          this.dataService.postEntity('addresses', this.customerAddress)
            .then((resCustomerData) => {
              this.customerAddress = resCustomerData;
              const index = this.customers.findIndex(c => c.id === resCustomerData.customerId);
              this.customers[index].addresses.push(resCustomerData)
            },
            (err) => console.log("addresses could not be updated :" + err)
           );
        }
      },
      (err) => console.log(entityName + " could not be added :" + err)
      );
  }

  openUpdateDialog(id: number): void {
    const index = this.customers.findIndex(c => c.id === id);
    this.customer = this.customers[index];
    var customerCopy = Object.assign({}, this.customer);

    let dialogRef = this.dialog.open(CustomerDialogComponent, {
      data: this
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.updateEntity('customers', id, result, this.customers);
      } else {
        this.customers[index] = customerCopy;
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

  addBreadCrumb(label, url, entityId) {
    let bread = new BreadCrumb();
    bread.id = "id";
    bread.label = label;
    bread.url = url;
    bread.entityId = entityId;
    console.log(bread)
    this.dataService.changeMessage(bread)
  }

  navigateViewCustomer(id) {
    this.addBreadCrumb('Customer', '/customer-view', id);
    this.router.navigate(['/customer-view', id], { skipLocationChange: true });
  }

}
