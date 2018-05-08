import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'footer',
  templateUrl: './footer.html'
})
export class FooterComponent {
  items: any[];
  title = 'Team Operations System';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
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
    this.router.navigate(['/']);
  }

  navigateCustomers() {
    this.router.navigate(['/customer-home'], { skipLocationChange: false });
  }

  navigateEmployeeHome() {
    this.router.navigate(['/employee-home'], { skipLocationChange: false });
  }

  navigateAbout() {
    this.router.navigate(['/about'], { skipLocationChange: false });
  }

  navigateProfile() {
    this.router.navigate(['/profile'], { skipLocationChange: false });
  }

}
