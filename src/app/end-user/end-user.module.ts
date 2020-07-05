import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EndUserRoutingModule } from './end-user-routing.module';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { AddResourceDetailsComponent } from './components/add-resource-details/add-resource-details.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AddResourceDetailsComponent,
    LoginModalComponent
  ],
  imports: [
    CommonModule,
    EndUserRoutingModule,
    SharedModule
  ],
  entryComponents: [
    LoginModalComponent
  ]
})
export class EndUserModule { }
