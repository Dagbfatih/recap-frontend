import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rental } from 'src/app/models/rental';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentals: RentalDetailDto[] = [];
  rental:RentalDetailDto;
  dataLoaded = false;

  constructor(
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getRentalByCar(params['carId']);
      }else{
        this.getRentals();
      }
    });
  }

  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data;
      this.dataLoaded = true;
    });
  }

  getRentalByCar(carId:number) {
    this.rentalService.getRentalByCar(carId).subscribe((response) => {
      this.rental = response.data;
      this.dataLoaded = true;
    });
  }
}
