import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { CustomDateComponent } from './components/custom-date/custom-date.component';
import { CustomDropdownComponent } from './components/custom-dropdown/custom-dropdown.component';
import { InputDropdownComponent } from './components/input-dropdown/input-dropdown.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CustomCheckboxComponent } from './components/checkbox/custom-checkbox.component';

@NgModule({
  declarations: [
    InputDropdownComponent,
    CustomInputComponent,
    CustomDropdownComponent,
    CustomDateComponent,
    ChangePasswordComponent,
    CustomCheckboxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    InputDropdownComponent,
    CustomInputComponent,
    CustomDropdownComponent,
    CustomDateComponent,
    CustomCheckboxComponent
  ],
  entryComponents: [
    ChangePasswordComponent
  ]
})
export class SharedModule { }
