import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CustomerService } from '../customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'goals',
  templateUrl: './goals.html'
})
export class GoalsComponent {
  custid: number;
  id: number;
  customersData = undefined;
  isUpdate:boolean = true;

  constructor(private customerService:CustomerService,private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
         this.custid = +params['custid']; // (+) converts string 'id' to a number
         this.id = +params['id']; // (+) converts string 'id' to a number

        if(!isNaN(this.custid) && isNaN(this.id)){
          this.isUpdate=false;
          this.customerService.getCustomerData(this.custid)
          .then((resCustomerData) => {
            this.customersData = resCustomerData;
          });
        }
      });
    }

  addNewGoal(goal) {
    goal.customerId = this.custid;
    this.customerService.postGoal(goal);
    location.reload();
  }
/*
  updateCustomer(customer) {
    customer.id=this.id;
    this.customerService.updateCustomer(customer);
    location.reload();
  }
*/
  resetForm(form: NgForm) {
    form.reset();
  }

}
