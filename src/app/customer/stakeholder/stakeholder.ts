export class Stakeholder {
  id = '';
  name = '';
  customerId = '';
  role = '';
  email = '';
  phoneNo = '';
  createdAt = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
