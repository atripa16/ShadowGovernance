import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './components/user/user.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { SuccessComponent } from './modals/success/success.component';
import { GlobalErrorHandler } from './utils/global-error-handler';
import { ConfirmComponent } from './modals/confirm/confirm.component';
import { ErrorComponent } from './modals/error/error.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';

@NgModule({
  declarations: [
    UserComponent,
    FooterComponent,
    ErrorComponent,
    SuccessComponent,
    ConfirmComponent,
    LoginModalComponent
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
    SuccessComponent,
    ConfirmComponent
  ],
  entryComponents: [
    ErrorComponent,
    SuccessComponent,
    ConfirmComponent,
    LoginModalComponent
  ]
})
export class HomeModule { }
