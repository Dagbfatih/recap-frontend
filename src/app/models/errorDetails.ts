import { ValidationError } from "./validationError";

export interface ErrorDetails{
    StatusCode:number;
    Message:string;
    ValidationErrors:ValidationError[];
}