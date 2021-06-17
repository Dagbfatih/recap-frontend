import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { RentalDetailDto } from '../models/rentalDetailDto';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';

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

  addRental(rental:Rental){
    let newPath=this.apiUrl+"rentals/add";
    return this.httpClient.post(newPath, rental);
  }
}
