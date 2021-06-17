import { Car } from './car';

export interface Rental {
  id?: number;
  carId: number;
  customerId: number;
  rentDate: Date;
  returnDate?: Date;
}
