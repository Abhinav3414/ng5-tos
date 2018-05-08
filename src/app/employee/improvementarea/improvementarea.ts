export class ImprovementArea {
  id = '';
  areasOfImprovement = '';
  employeeId = '';
  improvementPlan = '';
  proposedDate = '';
  createdAt = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
