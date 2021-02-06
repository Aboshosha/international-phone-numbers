import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerDisplayComponent } from './components/customer-display/customer-display.component';
import { InternationalPhoneNumbersModule } from './international-phone-numbers.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CustomerDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InternationalPhoneNumbersModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
