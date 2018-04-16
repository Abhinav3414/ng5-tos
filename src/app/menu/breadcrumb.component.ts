import { Component, Input } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { ActivatedRoute, Router } from '@angular/router';

import { BreadCrumb } from '../menu/breadCrumb';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.html'
})
export class BreadcrumbComponent {
  crumbs = Array<BreadCrumb>();

  constructor(private utilityService: UtilityService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.utilityService.currentBreadCrumb.subscribe(breadCrumb => {
      if (breadCrumb.state === 'entity') {
        this.crumbs.push(breadCrumb)
      }
      else {
        if (breadCrumb.state === 'entities') {
          this.crumbs = [];
          breadCrumb.label = breadCrumb.label + "s";
        }
        this.crumbs = [];
        if (breadCrumb.state !== 'none') {
          this.crumbs.push(breadCrumb)
        }
      }
    })
  }

  navigate(crumb) {
    if (crumb.state === 'entity') {
      let tempCrumbs = [];
      this.crumbs.forEach(c => {
        if (c.depth <= crumb.depth)
          tempCrumbs.push(c)
      })
      this.crumbs = [];
      this.crumbs = tempCrumbs;
      this.router.navigate([crumb.url, crumb.entityId], { skipLocationChange: true });
    }
    else if (crumb.state === 'entities') {
      this.crumbs = [];
      this.crumbs.push(crumb)
      this.router.navigate([crumb.url], { skipLocationChange: true });
    }
  }

}
