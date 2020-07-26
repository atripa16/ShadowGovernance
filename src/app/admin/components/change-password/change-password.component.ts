import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthenticationApiService } from 'src/app/core/services/authentication-api.service';
import { LoginModel } from 'src/app/core/models/login.model';
import { first } from 'rxjs/operators';
import { ChangePasswordModel } from '../../models/change-password.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    public modal: NgbActiveModal,
    private route: Router,
    private authenticationService: AuthenticationApiService
  ) { }

  changePasswordModel: ChangePasswordModel = {} as ChangePasswordModel;

  ngOnInit() {
  }

  changePassword(response: string) {
    this.modal.close(response);
    this.authenticationService.changePassword(this.changePasswordModel)
      .subscribe();
  }
}
