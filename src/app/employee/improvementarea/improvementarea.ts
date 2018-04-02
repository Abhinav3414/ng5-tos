export class ImprovementArea {
  areasOfImprovement = '';
  employeeId = '';
  improvementPlan = '';
  proposedDate = '';
  createdAt = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
