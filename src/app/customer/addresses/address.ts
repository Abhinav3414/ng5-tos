export class Address {
  id = '';
  address = '';
  country = '';
  customerId = '';
  createdAt = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
