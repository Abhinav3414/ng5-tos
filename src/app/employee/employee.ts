export class Employee {
  id = '';
  name = '';
  joiningDate = '';
  yearsOfExperience = '';
  responsibilities = '';
  createdAt = '';
  skills = [];
  certifications = [];
  trainings = [];
  feedbacks = [];
  improvementAreas = [];
  teamMembers = [];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
