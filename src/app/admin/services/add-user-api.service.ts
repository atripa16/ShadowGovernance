import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OptionModel } from 'src/app/core/models/option.model';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AddUserApiService {

  readonly registerUsr = environment.apiUrl + '/addNewUser';
  readonly roles = environment.apiUrl + '/loadRoles';

  constructor(private httpClient: HttpClient) { }

  registerUser(user: User) {
    return this.httpClient.post(this.registerUsr, user);
  }

  getRoles() {
    return this.httpClient.get<OptionModel[]>(this.roles);
  }
}
