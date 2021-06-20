import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { RentalDetailDto } from '../models/rentalDetailDto';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl=environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<RentalDetailDto>>{
    let newPath=this.apiUrl+"rentals/getrentalsdetails";
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(this.apiUrl);
  }

  getRentalByCar(carId:number):Observable<ItemResponseModel<RentalDetailDto>>{
    let newPath=this.apiUrl+"rentals/getbycarid?carId="+carId;
    return this.httpClient.get<ItemResponseModel<RentalDetailDto>>(newPath);
  }

  add(rental:Rental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"rentals/add", rental);
  }
}
