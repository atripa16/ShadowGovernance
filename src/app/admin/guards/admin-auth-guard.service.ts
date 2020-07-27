import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Errors } from 'src/app/home/enums/errors.enum';
import { User } from '../../core/models/user.model';
import { AuthenticationApiService } from '../../core/services/authentication-api.service';


@Injectable({ providedIn: 'root' })
export class AdminAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationApiService,
    private ngbModal: NgbModal
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser: User = this.authenticationService.currentUserValue;
    if (currentUser) {
      if (currentUser.role === 'Admin') {
        return true;
      } else {
        throw new Error(Errors.NOT_AUTHORIZE);
      }
    }
    throw new Error(Errors.NOT_AUTHENTICATED);
  }
}
