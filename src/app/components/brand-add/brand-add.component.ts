import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Messages } from 'src/app/constants/Messages';
import { BrandService } from 'src/app/services/brand.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  brandAddForm:FormGroup;

  constructor(private brandService:BrandService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private errorHandlerService:ErrorHandlerService) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }
  createBrandAddForm() {
    this.brandAddForm=this.formBuilder.group({
      brandName:['', Validators.required]
    });
  }

  add(){
    if (this.brandAddForm.valid) {
      let brandModel=Object.assign({}, this.brandAddForm.value);
      this.brandService.add(brandModel).subscribe(response=>{
        this.toastrService.success(response.message, Messages.successMessage);
      }, responseError=>{
        let errorMessages=this.errorHandlerService.getErrorMessages(responseError);
          errorMessages.forEach(message=>this.toastrService.error(message));
      })
    }else{
      this.toastrService.warning(Messages.allFieldsRequired, Messages.warningMessage);
    }
  }
}
