import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

import { CustomerDialogComponent } from './customer-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Customer } from './customer';

@Component({
  selector: 'customer-main',
  templateUrl: './customer-main.html'
})
export class CustomerMainComponent {
  customers = [];
  customer: any;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataService.getEntityAllData('customers')
      .then((resCustomerData) => {
        resCustomerData.forEach(e => this.customers.push(e));
      });
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(CustomerDialogComponent, {
      data: new Customer()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.addNewEntity('customers', result, this.customers)
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
    const index = this.customers.findIndex(c => c.id === id);
    this.customer = this.customers[index];
    var customerCopy = Object.assign({}, this.customer);

    let dialogRef = this.dialog.open(CustomerDialogComponent, {
      data: this.customer
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

  navigateViewCustomer(id) {
    this.router.navigate(['/customer-view', id], { skipLocationChange: true });
  }

}
