import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Messages } from 'src/app/constants/Messages';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css'],
})
export class ColorAddComponent implements OnInit {
  colorAddForm: FormGroup;

  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private errorHandlerService:ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      colorName: ['', Validators.required],
    });
  }

  add() {
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value);

      this.colorService.add(colorModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, Messages.successMessage);
        },
        (responseError) => {
          let errorMessages=this.errorHandlerService.getErrorMessages(responseError);
          errorMessages.forEach(message=>this.toastrService.error(message));
        }
      )
    }
  }
}
