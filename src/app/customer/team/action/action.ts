export class Action {
  id = '';
  details = '';
  goalId = '';
  teamId = null;
  customerId = null;
  ace5Id = null;
  cause = '';
  platform = '';
  status = '';
  createdAt = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
