import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './components/user/user.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { ErrorComponent } from './components/error/error.component';
import { SuccessComponent } from './components/success/success.component';
import { GlobalErrorHandler } from './utils/global-error-handler';

@NgModule({
  declarations: [
    UserComponent,
    FooterComponent,
    ErrorComponent,
    SuccessComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ],
  exports: [
    UserComponent,
    FooterComponent,
    ErrorComponent,
    SuccessComponent
  ],
  entryComponents: [
    ErrorComponent,
    SuccessComponent
  ]
})
export class HomeModule { }
