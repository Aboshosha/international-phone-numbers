import { Component, OnInit } from '@angular/core';
import { CountryMessage } from 'src/app/models/country-message.model';
import { Country } from 'src/app/models/country.model';
import { CustomerMessage } from 'src/app/models/customer-message.model';
import { Customer } from 'src/app/models/customer.model';
import { CountryService } from 'src/app/services/country/country.service';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'customer-display',
  templateUrl: './customer-display.component.html',
  styleUrls: ['./customer-display.component.css']
})
export class CustomerDisplayComponent implements OnInit {

  countries: Country[] = [];
  customers: Customer[] = [];
  selectedCountry: Country = new Country();

  constructor(private _countryService: CountryService, private _customerService: CustomerService) { }

  ngOnInit() {
    this.selectedCountry.name = "No Country!";
    this._countryService.getAllCountries().subscribe(response => {
      let countryMessage = response as CountryMessage;
      if (countryMessage.operationStatus === 'SUCCESSFUL') {
        this.countries = countryMessage.countries;
      }
    });

    this._customerService.getAllCustomers().subscribe(response => {
      let customerMessage = response as CustomerMessage;
      if (customerMessage.operationStatus === 'SUCCESSFUL') {
        this.customers = customerMessage.customers;
      }
    });

  }

  onCountrySelected(event) {
    let countryCode = event.target.value;
    this.selectedCountry = this.countries.find(country => country.code == countryCode);
    if (countryCode === 'default') {
      this._customerService.getAllCustomers().subscribe(response => {
        let customerMessage = response as CustomerMessage;
        if (customerMessage.operationStatus === 'SUCCESSFUL') {
          this.customers = customerMessage.customers;
        }
      });
    }
    else {
      this._customerService.getCustomerPhoneNumberByCountryCode(countryCode).subscribe(response => {
        let customerMessage = response as CustomerMessage;
        if (customerMessage.operationStatus === 'SUCCESSFUL') {
          this.customers = customerMessage.customers;
        }
      });
    }
  }

  onStateSelected(event) {
    let state = event.target.value;
    let stateRegex = new RegExp(this.selectedCountry.stateRegex);
    if (this.selectedCountry.name === 'No Country!') {
      alert('Please select a country!');
    }
    else if (stateRegex.test(state)) {
      this._customerService.getCustomerPhoneNumberByCountryCodeAndState(this.selectedCountry.code, state).subscribe(response => {
        let customerMessage = response as CustomerMessage;
        if (customerMessage.operationStatus === 'SUCCESSFUL') {
          this.customers = customerMessage.customers;
        }
      });
    }
    else {
      alert('This is not a valid state in ' + this.selectedCountry.name + '. Please select a valid state!');
    }
  }

  onFindByNumber(event) {
    let remaingNumber = (<HTMLInputElement>document.getElementById("remaingNumber")).value;
    let state = (<HTMLInputElement>document.getElementById("state")).value;
    let stateRegex = new RegExp(this.selectedCountry.stateRegex);
    let remainingRegex = new RegExp(this.selectedCountry.remianingRegex);
    if (this.selectedCountry.name === 'No Country!') {
      alert('Please select a country!');
    }
    else if (remainingRegex.test(remaingNumber) && stateRegex.test(state)) {
      this._customerService.getCustomerByPhoneNumber('(' + this.selectedCountry.code.replace('+', '') + ') ' + state + remaingNumber).subscribe(response => {
        let customerMessage = response as CustomerMessage;
        if (customerMessage.operationStatus === 'SUCCESSFUL') {
          this.customers = customerMessage.customers;
        }
      });
    }
    else {
      alert('This is not a valid phone number. Please select a valid phone number!');
    }
  }

}
