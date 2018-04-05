export class TeamMember {
  id = '';
  teamId = '';
  role = '';
  velocity = '';
  employeeId = '';
  createdAt = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
