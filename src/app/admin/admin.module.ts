import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CreateUserComponent } from './components/home-component/create-user/create-user.component';
import { AnalysisComponent } from './components/home-component/analysis/analysis.component';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CreateUserComponent, AnalysisComponent, HomeComponentComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
