import { Car } from './car';

export interface RentalDetailDto {
    id:number;
    carId:number;
    brandId:number;
    brandName:string;
    colorId:number;
    colorName:string;
    modelYear:string;
    dailyPrica:number;
    description:string;
    userName:string;
    companyName:string;
    rentDate:Date;
    returnDate?:Date;
}
