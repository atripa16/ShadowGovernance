import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationApiService } from 'src/app/core/services/authentication-api.service';
import { User } from 'src/app/core/models/user.model';
import { Errors } from 'src/app/home/enums/errors.enum';

@Injectable({
  providedIn: 'root'
})
export class EndUserAuthGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationApiService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const currentUser: User = this.authenticationService.currentUserValue;
    if (currentUser) {
      this.authenticationService.logout();
    }
    return true;
  }
}
