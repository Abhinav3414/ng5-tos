export class Feedback {
  id = '';
  feedback = '';
  employeeId = '';
  receivedFrom = '';
  actionsTaken = '';
  createdAt = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
