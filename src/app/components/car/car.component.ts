import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDetailDto[] = [];
  brands: Brand[];
  colors: Color[];

  currentCar: CarDetailDto;

  brandId: number = 0;
  colorId: number = 0;

  dataLoaded = false;
  filterText = '';

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId'] && params['colorId']) {
        this.getCarsByBrandAndColor(params['brandId'], params['colorId']);
      } else if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else {
        this.getCars();
      }
    });

    this.getBrands();
    this.getColors();
    console.log(
      'link:    ' +
        this.activatedRoute.snapshot.url.join('/').search('brandsfds')
    );
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  setCurrentCar(car: CarDetailDto) {
    this.currentCar = car;
  }

  getCurrentCarClass(car: Car) {
    if (car == this.currentCar) {
      return 'table-info cursorPointer';
    } else {
      return 'cursorPointer';
    }
  }

  getFilterRouterClass() {
    if (
      (this.brandId === 0 && this.colorId === 0) ||
      (!this.brandId && !this.colorId)
    ) {
      return '/cars';
    } else if (this.brandId === 0) {
      return '/cars/color/' + this.colorId;
    } else if (this.colorId === 0) {
      return '/cars/brand/' + this.brandId;
    } else {
      return '/cars/brand/' + this.brandId + '/color/' + this.colorId;
    }
  }

  getCarsByBrandAndColor(brandId: number, colorId: number) {
    this.carService
      .getCarsByBrandAndColor(brandId, colorId)
      .subscribe((response) => {
        this.cars = response.data;
        this.dataLoaded = true;
      });
  }
}
