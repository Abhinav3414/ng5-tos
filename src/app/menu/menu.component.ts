import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { BreadCrumb } from '../menu/breadCrumb';

@Component({
  selector: 'menu',
  templateUrl: './menu.html'
})
export class MenuComponent {
  items: any[];
  title = 'Team Operations System';
  bread: BreadCrumb;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.dataService.currentBreadCrumb.subscribe(bread => this.bread = bread);
    /*
      this.items = [
          {
              label: 'Home',
              icon: 'fa-home',
              command: (onclick)=> {this.navigateHome()}
          },
          {
              label: 'Employee',
              icon: 'fa-users',
              command: (onclick)=> {this.navigateEmployeeHome()}
          },
          {
              label: 'Customer',
              icon: 'fa-briefcase',
              command: (onclick)=> {this.navigateCustomers()}
          }
      ];
      */
  }

  navigateHome() {
    this.addBreadCrumb('None', '', -1);
    this.router.navigate(['/']);
  }

  navigateCustomers() {
    this.addBreadCrumb('Customer', '/customer-main', 0);
    this.router.navigate(['/customer-main'], { skipLocationChange: true });
  }

  navigateEmployeeHome() {
    this.addBreadCrumb('Employee', '/employee-main', 0);
    this.router.navigate(['/employee-main'], { skipLocationChange: true });
  }

  navigateAbout() {
    this.addBreadCrumb('None', '', -1);
    this.router.navigate(['/about'], { skipLocationChange: true });
  }

  navigateProfile() {
    this.addBreadCrumb('None', '', -1);
    this.router.navigate(['/profile'], { skipLocationChange: true });
  }

  addBreadCrumb(label, url, entityId) {
    let bread = new BreadCrumb('1');
    bread.id = "id";
    bread.label = label;
    bread.url = url;
    bread.entityId = entityId;
    console.log(bread)
    this.dataService.changeMessage(bread)
  }

}
