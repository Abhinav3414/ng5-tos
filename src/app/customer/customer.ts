export class Customer {
  id = '';
  name = '';
  contact = '';
  contactPerson = '';
  domain = '';
  address = '';
  country = '';
  createdAt = '';
  goals = [];
  teams = [];
  stakeHolders = [];
  travels = [];
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
