export class Stakeholder {
  id = '';
  name = '';
  customerId = '';
  role = '';
  email = '';
  phoneNo = '';
  contactPerson = false;
  createdAt = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
