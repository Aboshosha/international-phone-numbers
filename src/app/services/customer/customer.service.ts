import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _httpClient: HttpClient) { }

  public getAllCustomers() {
    return this._httpClient.get(environment.baseUrl + environment.getAllCustomers);
  }

  public getCustomerByPhoneNumber(phone: string) {
    return this._httpClient.get(environment.baseUrl + environment.getCustomerPhoneByPhone + '?phone=' + phone);
  }

  public getCustomerPhoneNumberByCountryCode(countryCode: string) {
    return this._httpClient.get(environment.baseUrl + environment.getCustomersPhonesByCountry + '?countryCode=' + countryCode.replace('+', '%2B'));
  }

  public getCustomerPhoneNumberByCountryCodeAndState(countryCode: string, state: string) {
    return this._httpClient.get(environment.baseUrl + environment.getCustomersPhonesByCountryAndState + '?countryCode=' + countryCode.replace('+', '%2B') + '&state=' + state);
  }

}
