export class Customer {
  name= '';
  contact= '';
  contactPerson= '';
  domain= '';
  createdAt= '';
  goals= [];
  teams= [];
  addresses= [];
  stakeHolders= [];
  travels= [];
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
