import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OptionModel } from 'src/app/core/models/option.model';
import { HttpClient } from '@angular/common/http';
import { AddUserDomainsModel } from '../models/add-user-domains.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EndUserDomainsApiService {

  readonly LOAD_ADD_USERS_DOMAINS = environment.apiUrl + '/end-user/mockTaskDescriptions.json';

  constructor(
    private http: HttpClient
  ) { }

  loadAddUsersDomains(): Observable<AddUserDomainsModel> {
    return this.http.get<AddUserDomainsModel>(this.LOAD_ADD_USERS_DOMAINS);
  }

}
