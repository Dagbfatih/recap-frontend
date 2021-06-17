import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl=environment.apiUrl;


  constructor(private httpClient:HttpClient) { }

  getCreditCards():Observable<ListResponseModel<CreditCard>>{
    let newPath=this.apiUrl+"creditCards/getall";
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  getCreditCardsByCustomerId(customerId:number):Observable<ListResponseModel<CreditCard>>{
    let newPath=this.apiUrl+"creditCards/getallbycustomerid?customerId="+customerId;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  add(creditCard:CreditCard){
    let newPath=this.apiUrl+"creditCards/add";
    return this.httpClient.post(newPath, creditCard);
  }
}
