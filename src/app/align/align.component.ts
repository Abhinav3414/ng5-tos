import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../services/data.service';
import { UtilityService } from '../services/utility.service';

import { BreadCrumb } from '../menu/breadCrumb';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Align } from './align';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'align',
  templateUrl: './align.html',
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate('200ms ease-in')
      ])
    ])
  ]
})
export class AlignComponent {
align = new Align();
customerId: number;
firstFormGroup: FormGroup;
secondFormGroup: FormGroup;
thirdFormGroup: FormGroup;
isOptional: boolean = false;

bread: BreadCrumb;

constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute,
   private utilityService: UtilityService, private _formBuilder: FormBuilder) {
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
        this.dataService.getEntityData('aligns', this.customerId)
          .then((resCustomerData) => {
            console.log('align from server : ' + resCustomerData)
            if(resCustomerData !== null) {
              this.align = resCustomerData;
            }
          },
          (err) => {
            console.log('No Align entity fount for customer');
          }
          );
      }
    });
    console.log(this.align)
  }

}
