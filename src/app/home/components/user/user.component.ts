import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from 'src/app/end-user/components/login-modal/login-modal.component';
import { AuthenticationApiService } from 'src/app/core/services/authentication-api.service';
import { User } from 'src/app/admin/models/User.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  currentUser: User;
  userName: string;
  currentUserObservable: Observable<User>;

  constructor(
    private ngbModal: NgbModal,
    private authenticationService: AuthenticationApiService,
    private router: Router

  ) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.currentUserObservable = this.authenticationService.currentUserObservable;
    this.currentUserObservable.subscribe((user: User) => {
      this.userName = user.firstName;
    });
  }

  logout(): void {
    console.log('logout');
    this.authenticationService.logout();
    this.router.navigate(['/end-user']);
  }

  openLoginModal(): void {
    this.ngbModal.open(LoginModalComponent, { centered: true });
  }

}
