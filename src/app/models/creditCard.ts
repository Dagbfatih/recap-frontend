export interface CreditCard{
    id?:number;
    customerId:number;
    cardName:string;
    cardNumber:string;
    cvv:number;
    expirationDate:Date;
}