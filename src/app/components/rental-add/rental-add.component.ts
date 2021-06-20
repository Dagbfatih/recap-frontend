import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { RentalService } from 'src/app/services/rental.service';
import { Car } from 'src/app/models/car';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
})
export class RentalAddComponent implements OnInit {
  car: Car={} as Car;
  rentAddForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private errorHandlerService:ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.car.carId = params.id;
    });
    this.createRentalAddForm();
  }

  createRentalAddForm() {
    this.rentAddForm = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }

  add() {
    if (this.rentAddForm.valid) {
      let rentalModel: Rental = Object.assign({}, this.rentAddForm.value);
      rentalModel.carId = this.car.carId;

      this.rentalService.add(rentalModel).subscribe(
        (response) => {
          console.log(response);
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          let errorMessages=this.errorHandlerService.getErrorMessages(responseError);
          errorMessages.forEach(message=>this.toastrService.error(message));
        }
      );
    } else {
      this.toastrService.warning('Formunuz Eksik', 'Dikkat');
    }
  }
}
