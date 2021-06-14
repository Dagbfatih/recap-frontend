import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  car:Car;
  images:CarImage[];
  imageUrl = environment.baseUrl;
  defaultImageUrl = environment.defaultImageUrl;
  
  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private carImageService:CarImageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["carId"]){
        this.getCar(params["carId"]);
        this.getCarImagesByCarId(params["carId"]);
      }
    })
  }

  getCar(carId:number)
  {
    this.carService.getCar(carId).subscribe(response => {
      this.car = response.data;
    })
  }

  getCarImagesByCarId(carId:number){
    this.carImageService.getCarImageByCar(carId).subscribe(response=>{
     this.images=response.data;
    })
  }

  getSliderClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }
}
