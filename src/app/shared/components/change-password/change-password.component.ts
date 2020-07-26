import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationApiService } from 'src/app/core/services/authentication-api.service';
import { ChangePasswordModel } from '../../../admin/models/change-password.model';
import { SuccessComponent } from 'src/app/home/components/success/success.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    public modal: NgbActiveModal,
    private ngbModal: NgbModal,
    private route: Router,
    private authenticationService: AuthenticationApiService
  ) { }

  changePasswordModel: ChangePasswordModel = {} as ChangePasswordModel;
  confirmPassword: string;

  ngOnInit() {
  }

  changePassword(response: string) {
    this.modal.close(response);
    this.authenticationService.changePassword(this.changePasswordModel)
      .subscribe(() => {
        const ngbModalRef: NgbModalRef = this.ngbModal.open(SuccessComponent, { centered: true, backdrop: 'static', keyboard: false });
        ngbModalRef.componentInstance.successMessage = 'Password changed Successfully!';
      });
  }
}
