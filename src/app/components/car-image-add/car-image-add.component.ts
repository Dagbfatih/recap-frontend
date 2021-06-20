import { Component, OnInit } from '@angular/core';
import { CarImage } from 'src/app/models/carImage';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-image-add',
  templateUrl: './car-image-add.component.html',
  styleUrls: ['./car-image-add.component.css'],
})
export class CarImageAddComponent implements OnInit {
  carImages: CarImage[] = [];

  constructor(private carImageService:CarImageService,
    ) {}

  ngOnInit(): void {}
}
