import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CustomerService } from '../customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'teams',
  templateUrl: './teams.html'
})
export class TeamsComponent {
  custid: number;
  id: number;
  customersData = undefined;
  isUpdate: boolean = true;

  constructor(private customerService: CustomerService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.custid = +params['custid']; // (+) converts string 'id' to a number
      this.id = +params['id']; // (+) converts string 'id' to a number

      if (!isNaN(this.custid) && isNaN(this.id)) {
        this.isUpdate = false;
        this.customerService.getCustomerData(this.custid)
          .then((resCustomerData) => {
            this.customersData = resCustomerData;
          });
      }
    });

  }

  addNewTeam(team) {
    team.customerId = this.custid;
    this.customerService.postTeam(team);
    location.reload();
  }

  resetForm(form: NgForm) {
    form.reset();
  }

}
