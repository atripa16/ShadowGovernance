import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/user.model';
import { AuthenticationApiService } from 'src/app/core/services/authentication-api.service';
import { Errors } from 'src/app/home/enums/errors.enum';

@Injectable({
  providedIn: 'root'
})
export class AnalystAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationApiService,
    private ngbModal: NgbModal,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser: User = this.authenticationService.currentUserValue;
    if (currentUser) {
      if (currentUser.role === 'Analyst') {
        return true;
      } else {
        throw new Error(Errors.NOT_AUTHORIZE);
      }
    }
    throw new Error(Errors.NOT_AUTHENTICATED);
  }
}
