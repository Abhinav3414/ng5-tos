import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DataService } from '../services/data.service';
import { UtilityService } from '../services/utility.service';

import { BreadCrumb } from '../menu/breadCrumb';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Ace5 } from './ace5';
import { Action } from '../customer/team/action/action';
import { ActionDialogComponent } from '../customer/team/action/action-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Customer } from '../customer/customer';

@Component({
  selector: 'ace5',
  templateUrl: './ace5.html',
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate('200ms ease-in')
      ])
    ])
  ]
})
export class Ace5Component {
  ace5: Ace5;
  customer: Customer;

  customerId: number;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  isOptional: boolean = false;

  customerAction: any;
  customerActions = [];

  bread: BreadCrumb;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute,
    private utilityService: UtilityService, private _formBuilder: FormBuilder, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ''
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ''
    });
    this.utilityService.currentBreadCrumb.subscribe(bread => this.bread = bread);

    this.route.params.subscribe(params => {
      this.customerId = +params['customerId']; // (+) converts string 'id' to a number
      if (!isNaN(this.customerId)) {
        this.dataService.getEntityData('ace5s', this.customerId)
          .then((resCustomerData) => {
            this.ace5 = resCustomerData;
            this.ace5.actions.forEach(e => this.customerActions.push(e));
          }, (err) => {
            console.log('No ace5s entity found for customer');
          });

        this.dataService.getEntityData('customers', this.customerId)
          .then((resCustomerData) => {
            this.customer = resCustomerData;
          }, (err) => {
            console.log('No customer entity found');
          });
      }
    });
  }

  openDialog(entityName): void {
    this.customerAction = new Action();
    this.customerAction.ace5Id = this.ace5.id;
    this.customerAction.customerId = this.customerId;
    this.openEntityDialog(ActionDialogComponent, entityName, this.customerActions);
  }

  openEntityDialog(dialogComponent, entityName, entityArray) {
    let dialogRef = this.dialog.open(dialogComponent, {
      data: this
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.addNewEntity(entityName, result, entityArray);
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

  openUpdateDialog(entityName: String, id: number): void {
    this.customerAction = this.customerActions[this.customerActions.findIndex(e => e.id === id)];
    this.openEntityUpdateDialog(entityName, ActionDialogComponent, id, this.customerActions);
  }


    openEntityUpdateDialog(entityName, dialogComponent, id, entityArray): void {
      const index = entityArray.findIndex(e => e.id === id);
      let entity = entityArray[index];
      var entityCopy = Object.assign({}, entity);

      let dialogRef = this.dialog.open(dialogComponent, {
        data: this
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result !== 'dialogDismissed' && result !== undefined) {
          this.updateEntity(entityName, id, result, entityArray);
        } else {
          entityArray[index] = entityCopy;
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

  delelteEntity(entityName, id, entityArray) {
    this.dataService.delelteEntity(entityName, id)
      .then((resCustomerData) => {
        entityArray.splice(entityArray.findIndex(function(i) {
          return i.id === id;
        }), 1);
      },
      (err) => console.log(entityName + " could not be deleted :" + err)
      );
  }


}
