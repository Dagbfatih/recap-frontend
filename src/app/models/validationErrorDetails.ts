import { ErrorDetails } from "./errorDetails";
import { ListResponseModel } from "./listResponseModel";
import { ValidationError } from "./validationError";

export interface ValidationErrorDetails extends ErrorDetails{
    validationErrors:ValidationError[];
}