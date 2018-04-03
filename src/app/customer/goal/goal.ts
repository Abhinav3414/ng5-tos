export class Goal {
  id = '';
  description = '';
  customerId = '';
  tenure = '';
  status = '';
  details = '';
  signedBy = '';
  createdAt = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
