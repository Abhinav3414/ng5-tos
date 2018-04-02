export class Feedback {
  feedback = '';
  employeeId = '';
  receivedFrom = '';
  actionsTaken = '';
  createdAt = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
