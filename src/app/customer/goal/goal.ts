export class Goal {
  id = '';
  description = '';
  customerId = '';
  tenure = '';
  status = '';
  notes = '';
  signedBy = '';
  createdAt = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
