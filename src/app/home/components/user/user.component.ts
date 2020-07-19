import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from 'src/app/end-user/components/login-modal/login-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private ngbModal: NgbModal
  ) { }

  ngOnInit() {
  }

  openLoginModal(): void {
    this.ngbModal.open(LoginModalComponent, { centered: true, size: 'sm' });
  }

}
