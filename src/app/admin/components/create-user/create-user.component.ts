import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OptionModel } from 'src/app/core/models/option.model';
import { AddUserApiService } from '../../services/add-user-api.service';
import { User } from 'src/app/core/models/user.model';
import { NgForm } from '@angular/forms';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessComponent } from 'src/app/home/modals/success/success.component';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  user: User = { firstName: '', lastName: '', role: null, userEmail: '' };

  roles: OptionModel = {} as OptionModel;

  constructor(
    private addUserApiService: AddUserApiService,
    private activatedRoute: ActivatedRoute,
    private ngbModal: NgbModal
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.roles = data.roles;
    });
  }

  createAccount(user: NgForm) {
    this.addUserApiService.registerUser(user.value).subscribe(() => {
      const ngbModalRef: NgbModalRef = this.ngbModal.open(SuccessComponent, { centered: true, backdrop: 'static', keyboard: false });
      ngbModalRef.componentInstance.successMessage = 'User Added Successfully!';
    });
  }
}
