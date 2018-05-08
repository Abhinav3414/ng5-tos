export class Certification {
  id = '';
  name = '';
  employeeId = '';
  yearOfCertification = '';
  createdAt = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
