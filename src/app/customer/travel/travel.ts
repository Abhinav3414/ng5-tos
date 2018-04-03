export class Travel {
  id = '';
  name = '';
  customerId = '';
  travellingFrom = '';
  travellingTo = '';
  travellingFromDate = '';
  travellingToDate = '';
  purpose = '';
  createdAt = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
