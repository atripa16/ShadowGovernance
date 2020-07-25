import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationApiService } from 'src/app/core/services/authentication-api.service';
import { first } from 'rxjs/operators';
import { LoginModel } from 'src/app/core/models/login.model';
import { ErrorComponent } from 'src/app/home/components/error/error.component';
import { error } from 'util';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  returnUrl: string;

  constructor(
    public modal: NgbActiveModal,
    private ngbModal: NgbModal,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationApiService
  ) { }

  loginModel: LoginModel = {} as LoginModel;

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/user/admin';
  }

  login(response: string) {
    this.modal.close(response);
    // this.route.navigate(['admin']);
    this.authenticationService.login(this.loginModel)
      .pipe(first())
      .subscribe(data => {
        if(data.role==='analyst'){
          this.route.navigate(['/user/analyst']);
        }else{
        this.route.navigate([this.returnUrl]);
        }
      },
        err => {
          const ngbModalRef: NgbModalRef = this.ngbModal.open(ErrorComponent,
            { centered: true, backdrop: 'static', keyboard: false });
          ngbModalRef.componentInstance.errorMessage = err.message;
        });
  }
}
