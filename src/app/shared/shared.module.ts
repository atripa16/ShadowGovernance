import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { CustomDateComponent } from './components/custom-date/custom-date.component';
import { CustomDropdownComponent } from './components/custom-dropdown/custom-dropdown.component';
import { InputDropdownComponent } from './components/input-dropdown/input-dropdown.component';

@NgModule({
  declarations: [
    InputDropdownComponent,
    CustomInputComponent,
    CustomDropdownComponent,
    CustomDateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    InputDropdownComponent,
    CustomInputComponent,
    CustomDropdownComponent,
    CustomDateComponent
  ]
})
export class SharedModule { }
