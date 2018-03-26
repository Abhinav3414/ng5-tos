import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Goals } from './goals/goals';
import { CustomerService } from './customer.service';

@Component({
  selector: 'customer-view',
  templateUrl: './customer-view.html'
})
export class CustomerViewComponent {
  id: number;
  customer = [];
  customerGoals = [];
  isUpdate:boolean = true;

  constructor(private customerService:CustomerService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
         this.id = +params['id']; // (+) converts string 'id' to a number
        if(!isNaN(this.id)){
          this.isUpdate=false;
          this.customerService.getCustomerData(this.id)
          .subscribe(resCustomerData => {
            this.customer = resCustomerData;
            if(this.customer.goals.length > 0)
            for(var i = 0; i < this.customer.goals.length; i++) {
               this.customerGoals.push(this.customer.goals[i]);
            }

          });
        }
      });

  }

  navigateNewGoals(custId) {
    this.router.navigate(['/goals/'+custId+'/new'], { skipLocationChange: true });
  }

  delelteGoal(id) {
    this.customerService.delelteGoal(id);
    location.reload();
  }

}
