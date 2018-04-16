import { Injectable } from '@angular/core';
import { BreadCrumb } from '../menu/breadCrumb';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';

@Injectable()
export class UtilityService {

  /* BehaviorSubject logic for breadCrumb */
  private breadCrumbSource = new BehaviorSubject<BreadCrumb>(new BreadCrumb());
  currentBreadCrumb = this.breadCrumbSource.asObservable();

  constructor() {
  }

  addBreadCrumb(depth, label, url, entityId, state, message) {
    let breadCrumb = new BreadCrumb();
    breadCrumb.depth = depth;
    breadCrumb.label = label;
    breadCrumb.url = url;
    breadCrumb.entityId = entityId;
    breadCrumb.state = state;
    breadCrumb.message = message;
    this.changeBreadCrumb(breadCrumb)
  }

  changeBreadCrumb(breadcrumb: BreadCrumb) {
    this.breadCrumbSource.next(breadcrumb)
  }

  checkEntity(entity: any[]) {
    if (entity.length === 0)
      return true;
    else
      return false;
  }

}
