import { Goals } from './goals/goals';

export interface Customer {
    id;
    name: string;
    contact: string;
    goals:Goals;
}
