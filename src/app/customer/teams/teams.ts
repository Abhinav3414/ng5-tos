import { Projectrythm } from './projectrythm/projectrythm';
import { Action } from './action/action';

export interface Teams {
  teamMembers: any;
  id: number;
  specialization: string;
  customerId: string;
  name: string;
  createdAt: string;
  goals: any;
  actions: any;
  projectRythms: any;
}
