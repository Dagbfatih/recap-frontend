import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Car } from 'src/app/models/car';
import { Messages } from 'src/app/constants/Messages';
import { getLocaleDateTimeFormat } from '@angular/common';
import { CarImage } from 'src/app/models/carImage';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup;
  images: CarImage[] = [];
  imageSrc: string;

  constructor(
    private carService: CarService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private errorHadlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.createCarAddForm();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  add() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      console.log('images: ' + carModel.images);
      console.log('images2: ' + this.images);

      this.carService.add(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          let errorMesssages =
            this.errorHadlerService.getErrorMessages(responseError);

          errorMesssages.forEach((message) =>
            this.toastrService.error(message)
          );
        }
      );
    } else {
      this.toastrService.warning(Messages.allFieldsRequired, 'Uyarı');
    }
  }
}
