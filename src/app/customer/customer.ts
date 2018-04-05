export class Customer {
  id = '';
  name = '';
  contact = '';
  contactPerson = '';
  domain = '';
  createdAt = '';
  goals = [];
  teams = [];
  addresses = [];
  stakeHolders = [];
  travels = [];
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
