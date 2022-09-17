import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatRadioModule } from "@angular/material/radio";
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { PrintErrorComponent } from './print-error/print-error.component';
import { ApplicationComponent } from './application/application.component';
import { AadharFormatDirective } from 'src/app/shared/directives/aadhar-validation/aadhar-format.directive';
import { UsPhoneFormatDirective } from 'src/app/shared/directives/phone-validation/us-phone-format.directive';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';

@NgModule({
  declarations: [
    HomeComponent,
    PrintErrorComponent,
    ApplicationComponent,
    AadharFormatDirective,
    UsPhoneFormatDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatRadioModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    ApplicationRoutingModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule
  ],
  exports: [
    ReactiveFormsModule,
    FlexLayoutModule,
    PrintErrorComponent,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatRadioModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class ApplicationModule { }
