import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomerService } from './customer.service';

@Component({
  selector: 'customer-main',
  templateUrl: './customer-main.html'
})
export class CustomerMainComponent {
  customers = [];

  constructor(private customerService:CustomerService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.customerService.getCustomersData()
    .then((resCustomerData) => {
      for(var i = 0; i < resCustomerData.length; i++) {
         this.customers.push(resCustomerData[i]);
       }
    });

  }

  delelteCustomer(id) {
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

  myMethod()
  {
    console.log("clicked")
  }


}
