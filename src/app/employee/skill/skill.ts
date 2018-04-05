export class Skill {
  id = '';
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
