import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OptionModel } from 'src/app/core/models/option.model';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/core/models/user.model';
import { AuthenticationApiService } from 'src/app/core/services/authentication-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddUserApiService {

  readonly registerUsr = environment.apiUrl + '/addNewUser';
  readonly roles = environment.apiUrl + '/loadRoles';

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationApiService) { }

  registerUser(user: User): Observable<string> {
    const currentUser = this.authenticationService.currentUserValue;

    return this.httpClient.post(this.registerUsr, user, {
      headers: { Authorization: `Bearer ${currentUser.token}` },
      responseType: 'text'
    }
    );
  }

  getRoles(): Observable<OptionModel[]> {
    return this.httpClient.get<OptionModel[]>(this.roles);
  }
}
