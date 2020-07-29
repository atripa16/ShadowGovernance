import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { HomeComponent } from '../components/home/home.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from 'src/app/home/modals/confirm/confirm.component';
import { AuthenticationApiService } from 'src/app/core/services/authentication-api.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanDeactivate<HomeComponent> {

  constructor(
    private ngbModal: NgbModal,
    private authenticationApiService: AuthenticationApiService
  ) { }

  canDeactivate(
    component: HomeComponent, currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> {

    const shouldRedirect$ = new Subject<boolean>();
    const ngbModalRef: NgbModalRef = this.ngbModal.open(ConfirmComponent, { centered: true, backdrop: 'static', keyboard: false });
    ngbModalRef.result.then((result) => {
      if (result === 'yes') {
        this.authenticationApiService.logout();
        shouldRedirect$.next(true);
        shouldRedirect$.complete();
      } else {
        shouldRedirect$.next(true);
        shouldRedirect$.complete();
      }
    });
    return shouldRedirect$.asObservable();
  }

}
