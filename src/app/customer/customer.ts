export class Customer {
  id = '';
  name = '';
  contact = '';
  contactPerson = '';
  domain = '';
  address = '';
  country = '';

  expectationFromOpd = '';
  process = '';
  processTools = '';
  solutionProduct ='';
  databaseUsed ='';
  operatingEnvironment ='';
  remoteMachineDetails ='';
  vpnDetails ='';
  communicator ='';
  skillsReuired ='';

  goals = [];
  actions = [];
  teams = [];
  stakeHolders = [];
  travels = [];
  createdAt = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
