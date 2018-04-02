export class Skill {
  name = '';
  employeeId = '';
  duration = '';
  rating = '';
  lastUsed = '';
  createdAt = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
