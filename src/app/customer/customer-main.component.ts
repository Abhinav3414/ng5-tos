import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { UtilityService } from '../services/utility.service';

import { CustomerDialogComponent } from './customer-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Customer } from './customer';
import { BreadCrumb } from '../menu/breadCrumb';
import { Address } from './addresses/address';

import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'customer-main',
  templateUrl: './customer-main.html',
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate('500ms ease-in')
      ])
    ])
  ]
})
export class CustomerMainComponent {
  customers = [];
  customer = new Customer();
  customerAddress = new Address();

  bread: BreadCrumb;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog, private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.utilityService.currentBreadCrumb.subscribe(bread => this.bread = bread);

    this.dataService.getEntityAllData('customers')
      .then((resCustomerData) => {
        resCustomerData.forEach(e => this.customers.push(e));
      });
  }

  openDialog(): void {
    this.customer = new Customer();
    this.customerAddress = new Address();
    this.customer.addresses[0] = this.customerAddress;
    let dialogRef = this.dialog.open(CustomerDialogComponent, {
      data: this
    });

    dialogRef.afterClosed().subscribe(result => {
      var addCustomer = false;
      if (result !== 'dialogDismissed' && result !== undefined) {
        if (result.customerAddress.address.length > 0 || (result.customerAddress.country.length > 0)) {
          this.customerAddress = result.customerAddress;
          addCustomer = true;
        }
        this.addNewEntity('customers', result.customer, this.customers, addCustomer)
      }
    });
  }

  addNewEntity(entityName, entity, entityArray, addCustomer) {
    var custCopy = Object.assign({}, entity);
    custCopy.addresses = [];
    this.dataService.postEntity(entityName, custCopy)
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
    var customerAddressCopy = Object.assign({}, this.customer.addresses[0]);

    let dialogRef = this.dialog.open(CustomerDialogComponent, {
      data: this
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.updateEntity('customers', id, result.customer, this.customers);
      } else {
        this.customers[index] = customerCopy;
        this.customers[index].addresses[0] = customerAddressCopy;
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

  navigateViewCustomer(id) {
    let entity = this.customers[this.customers.findIndex(c => c.id === id)];
    this.utilityService.addBreadCrumb(2, 'Customer', '/customer-view', id, 'entity', entity.name);
    this.router.navigate(['/customer-view', id], { skipLocationChange: true });
  }

  checkEntity(entity) {
    return this.utilityService.checkEntity(entity);
  }

}
