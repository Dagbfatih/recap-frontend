import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
})
export class RentalAddComponent implements OnInit {
  carId: number;
  rentDate: Date;
  returnDate: Date;
  dataLoaded = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carId = params['carId'];
      }
    });
  }

  rent() {
    if (
      this.rentDate > this.returnDate ||
      this.rentDate < new Date() ||
      !this.rentDate ||
      !this.returnDate
    ) {
      this.toastrService.warning(
        'Kiralama ve Teslim Tarihleri Geçerli Değil!'
      );
      return;
    }

    let rental: Rental = {
      carId: this.carId,
      rentDate: this.rentDate,
      returnDate: this.returnDate,
      customerId: 2,
    };
    this.toastrService.info('Ödeme Sayfasına Yönlendiriliyorsunuz...');
    this.router.navigate(['payment/',  JSON.stringify(rental)]);
  }
}
