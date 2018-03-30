import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from './customer.service';
import { Customer } from './customer';

import { AddressDialogComponent } from './addresses/address-dialog.component';
import { StakeholderDialogComponent } from './stakeholder/stakeholder-dialog.component';
import { GoalDialogComponent } from './goals/goal-dialog.component';
import { TeamDialogComponent } from './teams/team-dialog.component';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


const  dummyDialogEntity = { id: 0, name: "dummy" };

@Component({
  selector: 'customer-view',
  templateUrl: './customer-view.html'
})
export class CustomerViewComponent {
  id: number;

  customer: Customer;
  address: any;
  stakeholder: any;
  goal: any;
  team: any;
  travel: any;
  customerGoals = [];
  customerTeams = [];
  customerAddresses = [];
  customerStakeholders = [];
  customerTravels = [];
  isUpdate: boolean = true;


  constructor(private customerService: CustomerService, private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      if (!isNaN(this.id)) {
        this.isUpdate = false;

        this.customerService.getCustomerData(this.id)
          .then((resCustomerData) => {
            this.customer = resCustomerData;
            if (this.customer.goals.length > 0) {
              for (var i = 0; i < this.customer.goals.length; i++) {
                this.customerGoals.push(this.customer.goals[i]);
              }
            }
            if (this.customer.teams.length > 0) {
              for (var i = 0; i < this.customer.teams.length; i++) {
                this.customerTeams.push(this.customer.teams[i]);
              }
            }
            if (this.customer.addresses.length > 0) {
              for (var i = 0; i < this.customer.addresses.length; i++) {
                this.customerAddresses.push(this.customer.addresses[i]);
              }
            }
            if (this.customer.stakeHolders.length > 0) {
              for (var i = 0; i < this.customer.stakeHolders.length; i++) {
                this.customerStakeholders.push(this.customer.stakeHolders[i]);
              }
            }
            if (this.customer.travels.length > 0) {
              for (var i = 0; i < this.customer.travels.length; i++) {
                this.customerTravels.push(this.customer.travels[i]);
              }
            }
          });
      }
    });
  }

  openAddressDialog(): void {
    let dialogRef = this.dialog.open(AddressDialogComponent, {
      data: dummyDialogEntity
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != 'dialogDismissed') {
        this.addNewAddress(result)
      }
    });
  }

  openAddressUpdateDialog(id: number): void {
    for (let key in this.customerAddresses) {
      if (this.customerAddresses[key].id === id) {
        this.address = this.customerAddresses[key];
      }
    }

    let dialogRef = this.dialog.open(AddressDialogComponent, {
      data: this.address
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != 'dialogDismissed') {
        this.updateAddress(id, result);
      }
    });
  }

  openTeamDialog(): void {
    let dialogRef = this.dialog.open(TeamDialogComponent, {
      data: dummyDialogEntity
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != 'dialogDismissed') {
        this.addNewTeam(result)
      }
    });
  }

  openTeamUpdateDialog(id: number): void {
    for (let key in this.customerTeams) {
      if (this.customerTeams[key].id === id) {
        this.team = this.customerTeams[key];
      }
    }

    let dialogRef = this.dialog.open(TeamDialogComponent, {
      data: this.team
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != 'dialogDismissed') {
        this.updateTeam(id, result);
      }
    });
  }

  openGoalDialog(): void {
      let dialogRef = this.dialog.open(GoalDialogComponent, {
        data: dummyDialogEntity
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result != 'dialogDismissed') {
          console.log(result)
          this.addNewGoal(result)
        }
      });
    }

    openGoalUpdateDialog(id: number): void {
      for (let key in this.customerGoals) {
        if (this.customerGoals[key].id === id) {
          this.goal = this.customerGoals[key];
        }
      }

      let dialogRef = this.dialog.open(GoalDialogComponent, {
        data: this.goal
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result != 'dialogDismissed') {
          this.updateGoal(id, result);
        }
      });
    }

    openStakeholderDialog(): void {
        let dialogRef = this.dialog.open(StakeholderDialogComponent, {
          data: dummyDialogEntity
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result != 'dialogDismissed') {
            this.addNewStakeholder(result)
          }
        });
      }

      openStakeholderUpdateDialog(id: number): void {
        for (let key in this.customerStakeholders) {
          if (this.customerStakeholders[key].id === id) {
            this.stakeholder = this.customerStakeholders[key];
          }
        }

        let dialogRef = this.dialog.open(StakeholderDialogComponent, {
          data: this.stakeholder
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result != 'dialogDismissed') {
            this.updateStakeholder(id, result);
          }
        });
      }

  addNewAddress(address) {
    address.customerId = this.id;
    this.customerService.postAddress(address);
    location.reload();
  }

  addNewStakeholder(stakeholder) {
    stakeholder.customerId = this.id;
    this.customerService.postStakeholder(stakeholder);
    location.reload();
  }

  addNewGoal(goal) {
    goal.customerId = this.id;
    this.customerService.postGoal(goal);
    location.reload();
  }

  addNewTeam(team) {
    team.customerId = this.id;
    console.log(team)
    this.customerService.postTeam(team);
    location.reload();
  }

  updateAddress(id, address) {
    this.customerService.getAddressData(id)
      .then((resCustomerData) => {
        this.address = resCustomerData;
        this.address.addressType = address.addressType;
        this.address.houseNo = address.houseNo;
        this.address.street = address.street;
        this.address.landMark = address.landMark;
        this.address.zip = address.zip;
        this.address.state = address.state;
        this.address.country = address.country;
        this.customerService.updateAddress(this.address);
      });
    setTimeout(() => {
      location.reload();
    }, 500);
  }

  updateStakeholder(id, stakeholder) {
    this.customerService.getStakeholderData(id)
      .then((resCustomerData) => {
        this.stakeholder = resCustomerData;
        this.stakeholder.name = stakeholder.name;
        this.stakeholder.role = stakeholder.role;
        this.stakeholder.email = stakeholder.email;
        this.stakeholder.phoneNo = stakeholder.phoneNo;
        this.stakeholder.raci = stakeholder.raci;
        this.customerService.updateStakeholder(this.stakeholder);
      });
    setTimeout(() => {
      location.reload();
    }, 500);
  }

  updateTeam(id, team) {
    this.customerService.getTeamData(id)
      .then((resCustomerData) => {
        this.team = resCustomerData;
        this.team.name = team.name;
        this.team.specialization = team.specialization;
        this.customerService.updateTeam(this.team);
      });
    setTimeout(() => {
      location.reload();
    }, 500);
  }

  updateGoal(id, goal) {
    this.customerService.getGoalData(id)
      .then((resCustomerData) => {
        this.goal = resCustomerData;
        this.goal.description = goal.description;
        this.goal.status = goal.status;
        this.goal.details = goal.details;
        this.goal.signedBy = goal.signedBy;
        this.customerService.updateGoal(this.goal);
      });
    setTimeout(() => {
      location.reload();
    }, 500);
  }

  navigateViewTeam(teamId) {
    this.router.navigate(['/team-view', teamId], { skipLocationChange: true });
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

  delelteGoal(id, custId) {
    this.customerService.delelteGoal(id);
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

}
