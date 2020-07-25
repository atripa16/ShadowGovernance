import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { SharedModule } from '../shared/shared.module';
import { AnalysisApiService } from './services/analysis-api.service';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    CreateUserComponent,
    AnalysisComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ],
  providers: [
    AnalysisApiService
  ]
})
export class AdminModule { }
