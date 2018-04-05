export class Training {
  id = '';
  name = '';
  employeeId = '';
  mode = '';
  proposedDate = '';
  reason = '';
  createdAt = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
