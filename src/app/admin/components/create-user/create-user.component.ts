import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OptionModel } from 'src/app/core/models/option.model';
import { User } from '../../models/User.model';
import { AddUserApiService } from '../../services/add-user-api.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  user : User = {} as User;

  roles: OptionModel={} as OptionModel;

  constructor(private _addUserApiService:AddUserApiService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      console.log(data);
      
      this.roles = data.roles;
      });
  }

  createAccount() {
    this._addUserApiService.registerUser(this.user).subscribe();
  }
}
