export class Team {
  id = '';
  specialization = '';
  customerId = '';
  name = '';
  createdAt = '';
  teamMembers = [];
  actions = [];
  projectRythms = [];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
