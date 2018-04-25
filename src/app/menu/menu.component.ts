import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '../services/utility.service';
import { BreadCrumb } from '../menu/breadCrumb';

@Component({
  selector: 'menu',
  templateUrl: './menu.html'
})
export class MenuComponent {
  items: any[];
  title = 'Team Operations System';
  bread: BreadCrumb;

  constructor(private utilityService: UtilityService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.utilityService.currentBreadCrumb.subscribe(bread => this.bread = bread);
    /*
      this.items = [
          {
              label: 'Home',
              icon: 'fa-home',
              command: (onclick)=> {this.navigateHome()}
          }
      ];
      */
  }

  navigateHome() {
    this.utilityService.addBreadCrumb(0, 'None', '/', -1, 'none', '');
    this.router.navigate(['/']);
  }

  navigateCustomers() {
    this.utilityService.addBreadCrumb(1, 'Customer', '/customers', 0, 'entities', '');
    this.router.navigate(['/customers'], { skipLocationChange: false });
  }

  navigateEmployeeHome() {
    this.utilityService.addBreadCrumb(1, 'Employee', '/employees', 0, 'entities', '');
    this.router.navigate(['/employees'], { skipLocationChange: false });
  }

  navigateAbout() {
    this.utilityService.addBreadCrumb(1, 'About', '/about', 0, 'single', '');
    this.router.navigate(['/about'], { skipLocationChange: false });
  }

  navigateProfile() {
    this.utilityService.addBreadCrumb(1, 'Profile', '/profile', 0, 'single', '');
    this.router.navigate(['/profile'], { skipLocationChange: false });
  }

  logout() {
    localStorage.clear();
    this.utilityService.addTokenSubject('');
    this.router.navigate(['/login']);
  }

}
