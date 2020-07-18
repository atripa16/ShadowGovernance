import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  constructor(
    public modal: NgbActiveModal,
    private route: Router
  ) { }

  ngOnInit() {

  }

  login(response: string) {
    this.modal.close(response);
    this.route.navigate(['admin']);
  }
}
