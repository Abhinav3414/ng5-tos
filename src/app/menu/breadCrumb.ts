export class BreadCrumb {
  id = '';
  label = '';
  url = '';
  entityId = -1;
  message = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
};
