import { Component, OnInit } from '@angular/core';
import { OptionModel } from 'src/app/core/models/option.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {


  fName: string;
  lName: string;
  email: string;
  accType: string;
  types: OptionModel[] = [{ description: 'Type 1', code: 'Code 1' }];

  constructor() { }

  ngOnInit() {
  }

  createAccount() {

  }
}
