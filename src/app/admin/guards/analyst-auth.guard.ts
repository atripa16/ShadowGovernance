import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationApiService } from 'src/app/core/services/authentication-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from 'src/app/end-user/components/login-modal/login-modal.component';
import { User } from 'src/app/core/models/user.model';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AnalystAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationApiService,
    private ngbModal: NgbModal
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('route', route);
    console.log('state', state);


    const currentUser: User = this.authenticationService.currentUserValue;
    if (currentUser) {
      if (currentUser.role === 'Analyst') {
        return true;
      } else {
        // show message not authorize to access this page
        this.router.navigate(['/user/admin']);
        throw new Error('Not authorize');
        // return false;
      }
      // logged in so return true
      // return true;
    } else {
      this.ngbModal.open(LoginModalComponent, { centered: true });
      // open loginform
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/end-user'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
