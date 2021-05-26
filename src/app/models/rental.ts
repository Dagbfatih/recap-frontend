export interface Rental{
    id:number;
    carId:number;
    brandId:number;
    description:string;
    modelYear:string;
    colorId:number;
    colorName:string;
    userName:string;
    brandName:string;
    companyName:string;
    rentDate:Date;
    returnDate?:Date;
}