export class Stakeholder {
  id = '';
  name = '';
  customerId = '';
  role = '';
  email = '';
  phoneNo = '';
  raci = '';
  createdAt = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
