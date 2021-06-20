import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorDetails } from '../models/errorDetails';
import { ValidationErrorDetails } from '../models/validationErrorDetails';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor() {}

  getErrorDetails(responseError: any): ErrorDetails {
    if (responseError == null) {
      let returnedError: ErrorDetails = {
        Message: 'Error not found',
        StatusCode: 500,
        ValidationErrors: [],
      };
      console.log("message: "+returnedError.Message);
      return returnedError;
    }

    let returnedError: ErrorDetails = responseError.error;
    console.log("message1: "+responseError.error.Message);
    console.log("message2: "+returnedError.ValidationErrors[0].ErrorMessage);

    return returnedError;
  }

  getErrorMessages(responseError: any): string[] {
    let messages:string[]=[];
    if (responseError == null) {
      messages=["Error not found"];
      return messages;
    }

    let returnedError: ErrorDetails = responseError.error;
    if (returnedError.ValidationErrors) {
      messages=returnedError.ValidationErrors.map(v=>v.ErrorMessage);
    }else{
      messages=[returnedError.Message]
    }
    return messages;
  }
}
