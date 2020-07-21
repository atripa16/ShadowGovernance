import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OptionModel } from 'src/app/core/models/option.model';
import { environment } from 'src/environments/environment';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AddUserApiService {

  readonly registerUsr = environment.apiUrl + '/addNewUser'
  readonly roles = environment.apiUrl + '/loadRoles';

  constructor(private _httpClient:HttpClient) { }

  registerUser(user:User){
    return this._httpClient.post(this.registerUsr,user);
  }
  getRoles(){
    return this._httpClient.get<OptionModel[]>(this.roles);
  }
}
