import { Customer } from "./customer.model";

export class CustomerMessage {
    errorMessage: string;
    customers: Customer[];
    operationStatus: string;
}