import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from './customer.service';
import { Customer } from './customer';

@Component({
  selector: 'customer-view',
  templateUrl: './customer-view.html'
})
export class CustomerViewComponent {
  id: number;

  customer : Customer;
  customerGoals = [];
  customerTeams = [];
  customerAddresses = [];
  customerStakeholders = [];
  isUpdate:boolean = true;

  constructor(private customerService:CustomerService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
         this.id = +params['id']; // (+) converts string 'id' to a number
        if(!isNaN(this.id)){
          this.isUpdate=false;

          this.customerService.getCustomerData(this.id)
          .then((resCustomerData) => {
            this.customer = resCustomerData;
            if(this.customer.goals.length > 0) {
            for(var i = 0; i < this.customer.goals.length; i++) {
               this.customerGoals.push(this.customer.goals[i]);
            }
            }
            if(this.customer.teams.length > 0) {
            for(var i = 0; i < this.customer.teams.length; i++) {
               this.customerTeams.push(this.customer.teams[i]);
            }
          }
          if(this.customer.addresses.length > 0) {
          for(var i = 0; i < this.customer.addresses.length; i++) {
             this.customerAddresses.push(this.customer.addresses[i]);
          }
        }
        if(this.customer.stakeHolders.length > 0) {
        for(var i = 0; i < this.customer.stakeHolders.length; i++) {
           this.customerStakeholders.push(this.customer.stakeHolders[i]);
        }
      }

          });


        }
      });

  }

  navigateViewTeam(teamId) {
    this.router.navigate(['/team-view', teamId], { skipLocationChange: true });
  }

  navigateNewGoals(custId) {
    this.router.navigate(['/goals/'+custId+'/new'], { skipLocationChange: true });
  }

  navigateNewTeams(custId) {
    this.router.navigate(['/teams/'+custId+'/new'], { skipLocationChange: true });
  }

  navigateNewAddress(custId) {
    this.router.navigate(['/address/'+custId+'/new'], { skipLocationChange: true });
  }

  navigateNewStakeholders(custId) {
    this.router.navigate(['/stakeholder/'+custId+'/new'], { skipLocationChange: true });
  }

  delelteGoal(id, custId) {
    this.customerService.delelteGoal(id);
    this.router.navigate(['/customer-view', custId]);
    location.reload()
/*
  location.pathname = '/customer-view/'+custId;
    const url = this.router.url.split('?')[0]; // this will remove previous queryparms
    this.router.navigate([url], { queryParams: { page: event },  skipLocationChange: true });

    setTimeout(() => {
        location.reload();
    }, 1000);
*/
  }

  delelteTeam(id) {
    this.customerService.delelteTeam(id);
    location.reload();
  }

  delelteAddress(id) {
    this.customerService.delelteAddress(id);
    location.reload();
  }

  delelteStakeholder(id) {
    this.customerService.delelteStakeholder(id);
    location.reload();
  }

}
