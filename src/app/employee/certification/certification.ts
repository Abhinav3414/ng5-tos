export class Certification {
  name = '';
  employeeId = '';
  yearOfCertification = '';
  createdAt = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
