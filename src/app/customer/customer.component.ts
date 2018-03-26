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

  constructor(private customerService:CustomerService,private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
         this.id = +params['id']; // (+) converts string 'id' to a number
        if(!isNaN(this.id)){
          this.isUpdate=false;
          this.customerService.getCustomerData(this.id)
          .subscribe(resCustomerData => {
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
    customer.id=this.id;
    this.customerService.updateCustomer(customer);
    location.reload();
  }

  resetForm(form: NgForm) {
    form.reset();
  }

}
