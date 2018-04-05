export class ProjectRythm {
  id = '';
  event = '';
  teamId = '';
  frequency = '';
  whoRythm = '';
  whereRythm = '';
  createdAt = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
