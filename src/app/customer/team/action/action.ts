export class Action {
  id = '';
  details = '';
  teamId = '';
  cause = '';
  platform = '';
  status = '';
  createdAt = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
