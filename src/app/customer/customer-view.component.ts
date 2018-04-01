import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DataService } from '../services/data.service';
import { Customer } from './customer';
import { AddressDialogComponent } from './addresses/address-dialog.component';
import { StakeholderDialogComponent } from './stakeholder/stakeholder-dialog.component';
import { GoalDialogComponent } from './goals/goal-dialog.component';
import { TeamDialogComponent } from './teams/team-dialog.component';
import { TravelDialogComponent } from './travel/travel-dialog.component';

import { slideInDownAnimation } from '../animations';

const dummyDialogEntity = { id: 0, name: "dummy" };

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


  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      if (!isNaN(this.id)) {
        this.isUpdate = false;

        this.dataService.getEntityData('customers', this.id)
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
      if (result !== 'dialogDismissed' && result !== undefined) {
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
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.updateAddress(id, result);
      }
    });
  }

  openTeamDialog(): void {
    let dialogRef = this.dialog.open(TeamDialogComponent, {
      data: dummyDialogEntity
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
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
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.updateTeam(id, result);
      }
    });
  }

  openGoalDialog(): void {
    let dialogRef = this.dialog.open(GoalDialogComponent, {
      data: dummyDialogEntity
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
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
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.updateGoal(id, result);
      }
    });
  }

  openStakeholderDialog(): void {
    let dialogRef = this.dialog.open(StakeholderDialogComponent, {
      data: dummyDialogEntity
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
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
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.updateStakeholder(id, result);
      }
    });
  }

  openTravelDialog(): void {
    let dialogRef = this.dialog.open(TravelDialogComponent, {
      data: dummyDialogEntity
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.addNewTravel(result)
      }
    });
  }

  openTravelUpdateDialog(id: number): void {
    for (let key in this.customerTravels) {
      if (this.customerTravels[key].id === id) {
        this.travel = this.customerTravels[key];
      }
    }

    let dialogRef = this.dialog.open(TravelDialogComponent, {
      data: this.travel
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.updateTravel(id, result);
      }
    });
  }

  addNewAddress(address) {
    address.customerId = this.id;
    this.dataService.postEntity('addresses', address)
      .then((resCustomerData) => {
        this.customerAddresses.push(resCustomerData);
      },
      (err) => console.log("address could not be added :" + err)
      );
  }

  addNewStakeholder(stakeholder) {
    stakeholder.customerId = this.id;
    this.dataService.postEntity('stakeholders', stakeholder)
      .then((resCustomerData) => {
        this.customerStakeholders.push(resCustomerData);
      },
      (err) => console.log("address could not be added :" + err)
      );
  }

  addNewGoal(goal) {
    goal.customerId = this.id;
    this.dataService.postEntity('goals', goal)
      .then((resCustomerData) => {
        this.customerGoals.push(resCustomerData);
      },
      (err) => console.log("address could not be added :" + err)
      );
  }

  addNewTeam(team) {
    team.customerId = this.id;
    this.dataService.postEntity('teams', team)
      .then((resCustomerData) => {
        this.customerTeams.push(resCustomerData);
      },
      (err) => console.log("address could not be added :" + err)
      );
  }

  addNewTravel(travel) {
    travel.customerId = this.id;
    this.dataService.postEntity('travels', travel)
      .then((resCustomerData) => {
        this.customerTravels.push(resCustomerData);
      },
      (err) => console.log("address could not be added :" + err)
      );
  }

  updateAddress(id, address) {
    this.dataService.getEntityData('addresses', id)
      .then((resCustomerData) => {
        this.address = resCustomerData;
        this.address.addressType = address.addressType;
        this.address.houseNo = address.houseNo;
        this.address.street = address.street;
        this.address.landMark = address.landMark;
        this.address.zip = address.zip;
        this.address.state = address.state;
        this.address.country = address.country;
        let tempAdd = this.address;
        this.dataService.updateEntity('addresses', this.address.id, this.address)
          .then((resCustomerData) => {
            let index;
            this.customerAddresses.forEach(function(add, i) {
              if (add.id === tempAdd.id)
                index = i;
            });
            this.customerAddresses[index] = tempAdd;
          },
          (err) => console.log("Address " + tempAdd.name + " could not be updated :" + err)
          );
      });
  }

  updateStakeholder(id, stakeholder) {
    this.dataService.getEntityData('stakeholders', id)
      .then((resCustomerData) => {
        this.stakeholder = resCustomerData;
        this.stakeholder.name = stakeholder.name;
        this.stakeholder.role = stakeholder.role;
        this.stakeholder.email = stakeholder.email;
        this.stakeholder.phoneNo = stakeholder.phoneNo;
        this.stakeholder.raci = stakeholder.raci;

        let tempStakeHolder = this.stakeholder;
        this.dataService.updateEntity('stakeholders', this.stakeholder.id, this.stakeholder)
          .then((resCustomerData) => {
            let index;
            this.customerStakeholders.forEach(function(add, i) {
              if (add.id === tempStakeHolder.id)
                index = i;
            });
            this.customerStakeholders[index] = tempStakeHolder;
          },
          (err) => console.log("StakeHolder could not be updated :" + err)
          );
      });
  }

  updateTeam(id, team) {
    this.dataService.getEntityData('teams', id)
      .then((resCustomerData) => {
        this.team = resCustomerData;
        this.team.name = team.name;
        this.team.specialization = team.specialization;

        let tempTeam = this.team;
        this.dataService.updateEntity('teams', this.team.id, this.team)
        .then((resCustomerData) => {
          let index;
          this.customerTeams.forEach(function(add, i) {
            if (add.id === tempTeam.id)
              index = i;
          });
          this.customerTeams[index] = tempTeam;
        },
        (err) => console.log("Team could not be updated :" + err)
        );
    });
  }

  updateGoal(id, goal) {
    this.dataService.getEntityData('goals', id)
      .then((resCustomerData) => {
        this.goal = resCustomerData;
        this.goal.description = goal.description;
        this.goal.status = goal.status;
        this.goal.details = goal.details;
        this.goal.signedBy = goal.signedBy;
        let tempGoal = this.goal;
        this.dataService.updateEntity('goals', this.goal.id, this.goal)
        .then((resCustomerData) => {
          let index;
          this.customerGoals.forEach(function(add, i) {
            if (add.id === tempGoal.id)
              index = i;
          });
          this.customerGoals[index] = tempGoal;
        },
        (err) => console.log("Goal could not be updated :" + err)
        );
    });
  }

  updateTravel(id, travel) {
    this.dataService.getEntityData('travels', id)
      .then((resCustomerData) => {
        this.travel = resCustomerData;
        this.travel.name = travel.name;
        this.travel.travellingFrom = travel.travellingFrom;
        this.travel.travellingTo = travel.travellingTo;
        this.travel.travellingFromDate = travel.travellingFromDate;
        this.travel.travellingToDate = travel.travellingToDate;
        this.travel.purpose = travel.purpose;

        let tempTravel = this.travel;
        this.dataService.updateEntity('travels', this.travel.id, this.travel)
        .then((resCustomerData) => {
          let index;
          this.customerTravels.forEach(function(add, i) {
            if (add.id === tempTravel.id)
              index = i;
          });
          this.customerTravels[index] = tempTravel;
        },
        (err) => console.log("Travel could not be updated :" + err)
        );
    });
  }

  navigateViewTeam(teamId) {
    this.router.navigate(['/team-view', teamId], { skipLocationChange: true });
  }

  delelteTeam(id) {
    this.dataService.delelteEntity('teams', id)
      .then((resCustomerData) => {
        this.customerTeams.splice(this.customerTeams.findIndex(function(i) {
          return i.id === id;
        }), 1);
      },
      (err) => console.log("Customer could not be deleted :" + err)
      );
  }

  delelteAddress(id) {
    this.dataService.delelteEntity('addresses', id)
      .then((resCustomerData) => {
        this.customerAddresses.splice(this.customerAddresses.findIndex(function(i) {
          return i.id === id;
        }), 1);
      },
      (err) => console.log("Customer could not be deleted :" + err)
      );
  }

  delelteStakeholder(id) {
    this.dataService.delelteEntity('stakeholders', id)
      .then((resCustomerData) => {
        this.customerStakeholders.splice(this.customerStakeholders.findIndex(function(i) {
          return i.id === id;
        }), 1);
      },
      (err) => console.log("Customer could not be deleted :" + err)
      );
  }

  delelteTravel(id) {
    this.dataService.delelteEntity('travels', id)
      .then((resCustomerData) => {
        this.customerTravels.splice(this.customerTravels.findIndex(function(i) {
          return i.id === id;
        }), 1);
      },
      (err) => console.log("Customer could not be deleted :" + err)
      );
  }

  delelteGoal(id) {
    this.dataService.delelteEntity('goals', id)
      .then((resCustomerData) => {
        this.customerGoals.splice(this.customerGoals.findIndex(function(i) {
          return i.id === id;
        }), 1);
      },
      (err) => console.log("Customer could not be deleted :" + err)
      );
  }

}
