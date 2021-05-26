import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerResponseModel } from '../models/customerResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  apiUrl='https://localhost:44347/api/customers/getall';
  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<CustomerResponseModel>{
    return this.httpClient.get<CustomerResponseModel>(this.apiUrl);
  }
}
