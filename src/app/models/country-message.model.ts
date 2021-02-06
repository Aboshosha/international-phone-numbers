import { Country } from "./country.model";

export class CountryMessage {
    errorMessage: string;
    countries: Country[];
    operationStatus: string;
}