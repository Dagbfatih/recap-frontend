import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl=environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  pay(payment:Payment){
    let newPath=this.apiUrl+"payment/pay";
    this.httpClient.post(this.apiUrl, payment);
  }
}
