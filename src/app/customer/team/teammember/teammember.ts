export class TeamMember {
  id = '';
  teamId = '';
  role = '';
  productivity = '';
  employeeId = '';
  createdAt = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
