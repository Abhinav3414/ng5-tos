export class BreadCrumb {
  depth = '';
  label = '';
  url = '';
  entityId = -1;
  state = '';  /* Crumb state could be [entity, entities, single, none] */
  message = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
};
