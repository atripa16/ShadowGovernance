import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AuthenticationApiService } from 'src/app/core/services/authentication-api.service';
import { LoginModalComponent } from 'src/app/end-user/components/login-modal/login-modal.component';
import { User } from 'src/app/core/models/user.model';
import { ChangePasswordComponent } from 'src/app/shared/components/change-password/change-password.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userName: string;
  currentUserObservable: Observable<User>;

  constructor(
    private ngbModal: NgbModal,
    private authenticationService: AuthenticationApiService,
    private router: Router

  ) { }

  ngOnInit() {
    this.currentUserObservable = this.authenticationService.currentUserObservable;
    this.currentUserObservable.subscribe((user: User) => {
      if (user) {
        this.userName = user.firstName;
      }
    });
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/end-user']);
  }

  openLoginModal(): void {
    this.ngbModal.open(LoginModalComponent, { centered: true });
  }

  changePassword(): void {
    console.log('opening change pasword');
    this.ngbModal.open(ChangePasswordComponent, { centered: true });
  }

}
