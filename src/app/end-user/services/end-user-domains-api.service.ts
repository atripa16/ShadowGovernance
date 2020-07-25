import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddUserDomainsModel } from '../models/add-user-domains.model';
import { AuthenticationApiService } from 'src/app/core/services/authentication-api.service';

@Injectable({
  providedIn: 'root'
})
export class EndUserDomainsApiService {

  // readonly LOAD_ADD_USERS_DOMAINS = environment.apiUrl + '/end-user/mockTaskDescriptions.json';
  readonly LOAD_ADD_USERS_DOMAINS = environment.apiUrl + '/loadBusinessUnits';
  
  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationApiService
  ) { }

  loadAddUsersDomains(): Observable<AddUserDomainsModel> {
    return this.http.get<AddUserDomainsModel>(this.LOAD_ADD_USERS_DOMAINS);
  }


}
