import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CustomerService } from './customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'customer',
  templateUrl: './customer.html'
})
export class CustomerComponent {
  id: number;
  customersData = undefined;
  isUpdate:boolean = true;
  customer = undefined;

  constructor(private customerService:CustomerService,private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
         this.id = +params['id']; // (+) converts string 'id' to a number
        if(!isNaN(this.id)){
          this.isUpdate=false;
          this.customerService.getCustomerData(this.id)
          .then((resCustomerData) => {
            this.customersData = resCustomerData;
          });
}
      });
    }

  addNewCustomer(customer) {
    this.customerService.postCustomer(customer);
    location.reload();
  }

  updateCustomer(customer) {

    this.customerService.getCustomerData(this.id)
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

  resetForm(form: NgForm) {
    form.reset();
  }

}
