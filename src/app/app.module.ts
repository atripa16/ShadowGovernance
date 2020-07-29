import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { fakeBackendProvider, FakeBackendInterceptor } from './core/interceptors/fake-backend-interceptor.service';
import { JwtInterceptor } from './core/interceptors/jwt-interceptor.service';
import { EndUserModule } from './end-user/end-user.module';
import { HomeModule } from './home/home.module';
import { GlobalErrorHandler } from './home/utils/global-error-handler';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    EndUserModule,
    HomeModule,
    CoreModule,
  ],
  providers: [
    // { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
