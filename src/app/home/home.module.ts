import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './components/user/user.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    UserComponent,
    FooterComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ],
  exports: [
    UserComponent,
    FooterComponent,
    ErrorComponent
  ],
  entryComponents: [
    ErrorComponent
  ]
})
export class HomeModule { }
