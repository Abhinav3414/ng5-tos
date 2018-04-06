import { Component, Input } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

import { BreadCrumb } from '../menu/breadCrumb';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.html'
})
export class BreadcrumbComponent {
  @Input() val;
  breadCrumb: BreadCrumb;
  crumbs = [];
  crumbsMap = new Map();

  constructor(private data: DataService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.data.currentBreadCrumb.subscribe(breadCrumb => {

      if (breadCrumb.entityId === 0) {
        breadCrumb.label = breadCrumb.label + "s";
      }

      this.breadCrumb = breadCrumb;

      if (breadCrumb.label === 'Customers' || breadCrumb.label === 'Employees') {
        let tempCrumb = breadCrumb;
        this.crumbs = [];
        this.crumbs.push(tempCrumb)
      }
      else if(breadCrumb.label === 'None')
  this.crumbs = [];

       else {
        this.crumbs.push(breadCrumb)
      }

    })
  }

  navigate(crumb) {
    if (crumb.label === 'Employee') {
      this.router.navigate(['/employee-view', crumb.entityId], { skipLocationChange: true });
    } else if (crumb.label === 'Customer') {

      let tempCrumbs = [];
      this.crumbs.forEach(c => {
        if (c.label !== 'Team')
          tempCrumbs.push(c)
      })
      this.crumbs = [];
      this.crumbs = tempCrumbs;
      this.router.navigate(['/customer-view', crumb.entityId], { skipLocationChange: true });
    }
    else if (crumb.label === 'Customers') {
      let tempCrumb = crumb;
      this.crumbs = [];
      this.crumbs.push(crumb)
      this.router.navigate(['/customer-main'], { skipLocationChange: true });
    }
    else if (crumb.label === 'Employees') {
      let tempCrumb = crumb;
      this.crumbs = [];
      this.crumbs.push(crumb)
      this.router.navigate(['/employee-main'], { skipLocationChange: true });
    }
    else if (crumb.label === 'Team') {
      this.router.navigate(['/team-view', crumb.entityId], { skipLocationChange: true });
    }
    else if (crumb.label === 'None') {
    }

  }

}
