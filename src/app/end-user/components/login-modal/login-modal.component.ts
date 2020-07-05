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

  login(){
    this.modal.close('Ok click');
    this.route.navigate(['admin'])
  }
}
