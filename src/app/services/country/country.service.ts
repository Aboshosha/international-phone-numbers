import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private _httpClient: HttpClient) { }

  public getAllCountries() {
    return this._httpClient.get(environment.baseUrl + environment.getAllCoutries);
  }

  public getCountryByCode(code: string) {
    return this._httpClient.get(environment.baseUrl + environment.getCountryByCode + '?countryCode=' + code.replace('+', '%2B'));
  }
  public getAllCountryByName(name: string) {
    return this._httpClient.get(environment.baseUrl + environment.getCountryByName + '?countryCode=' + name);
  }

}
