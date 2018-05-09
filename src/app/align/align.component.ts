import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../services/data.service';
import { UtilityService } from '../services/utility.service';

import { BreadCrumb } from '../menu/breadCrumb';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Align } from './align';

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
align: any;
customerId: number;


bread: BreadCrumb;

constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute,
   private utilityService: UtilityService) {
}

  ngOnInit() {
    console.log("hi")
    this.utilityService.currentBreadCrumb.subscribe(bread => this.bread = bread);

    this.route.params.subscribe(params => {
      this.customerId = +params['customerId']; // (+) converts string 'id' to a number
      if (!isNaN(this.customerId)) {
        this.dataService.getEntityData('aligns', this.customerId)
          .then((resCustomerData) => {
            this.align = resCustomerData;
            console.log(this.align)
          },
          (err) => {
            console.log('No Align entity fount for customer');
            this.align= new Align();
            console.log(this.align);
          }
          );
      }
    });
  }

}
