export class Address {
  id = '';
  addressType = '';
  houseNo = '';
  street = '';
  landMark = '';
  city = '';
  zip = '';
  state = '';
  country = '';
  customerId = '';
  createdAt = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
