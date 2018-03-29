import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CustomerService } from '../../customer.service';
import { ActivatedRoute } from '@angular/router';

import { Teams } from '../teams';

@Component({
  selector: 'projectrythm',
  templateUrl: './projectrythm.html'
})
export class ProjectrythmComponent {
  teamid: number;
  id: number;
  customerTeamData: Teams;
  isUpdate: boolean = true;

  constructor(private customerService: CustomerService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.teamid = +params['teamid']; // (+) converts string 'id' to a number
      this.id = +params['id']; // (+) converts string 'id' to a number

      if (!isNaN(this.teamid) && isNaN(this.id)) {
        this.isUpdate = false;
         this.customerService.getTeamData(this.teamid)
          .then((resCustomerData) => {
            this.customerTeamData = resCustomerData;
          });
      }
    });
  }

  addNewProjectrythm(projectrythm) {
    projectrythm.teamId = this.teamid;
    this.customerService.postProjectrythm(projectrythm);
    location.reload();
  }

  resetForm(form: NgForm) {
    form.reset();
  }

}
