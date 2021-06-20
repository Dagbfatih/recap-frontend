import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Messages } from 'src/app/constants/Messages';
import { Car } from 'src/app/models/car';
import { ErrorDetails } from 'src/app/models/errorDetails';
import { ValidationErrorDetails } from 'src/app/models/validationErrorDetails';
import { CarService } from 'src/app/services/car.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm: FormGroup;
  car: Car = {} as Car;
  carId: number;

  constructor(
    private carService: CarService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.carId = params.id;
    });
    this.createCarUpdateForm();
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  update() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      carModel.id = 6;

      this.carService.update(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, Messages.successMessage);
        },
        (responseError) => {
          let errorMessages=this.errorHandlerService.getErrorMessages(responseError);
          
          errorMessages.forEach(message => {
            this.toastrService.error(message, Messages.errorMessage);
          });
        }
      );
    } else {
      this.toastrService.warning(
        Messages.allFieldsRequired,
        Messages.warningMessage
      );
    }
  }

  // let errorDetails: ErrorDetails =
  //           this.errorHandlerService.getErrorDetails(responseError);

  //         if (errorDetails.ValidationErrors) {
  //           for (let i = 0; i < errorDetails.ValidationErrors.length; i++) {
  //             this.toastrService.error(errorDetails.ValidationErrors[i].ErrorMessage);
  //           }
  //         }else{
  //           this.toastrService.error(errorDetails.Message);
  //         }
}
