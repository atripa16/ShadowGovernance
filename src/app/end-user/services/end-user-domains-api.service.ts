import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddUserDomainsModel } from '../models/add-user-domains.model';
import { EmployeeInfo } from '../models/employee-data.model';

@Injectable({
  providedIn: 'root'
})
export class EndUserDomainsApiService {

  // readonly LOAD_ADD_USERS_DOMAINS = environment.apiUrl + '/end-user/mockTaskDescriptions.json';
  readonly LOAD_ADD_USERS_DOMAINS = environment.apiUrl + '/loadBusinessUnits';

  readonly FETCH_END_USER_DOMAINS = environment.apiUrl + '/change';

  readonly INSERT_END_USER_DETAILS = environment.apiUrl + '/change';

  constructor(
    private http: HttpClient
  ) { }

  loadAddUsersDomains(): Observable<AddUserDomainsModel> {
    return this.http.get<AddUserDomainsModel>(this.LOAD_ADD_USERS_DOMAINS);
  }

  fetchEndUserDetails(id: number): Observable<EmployeeInfo> {
    return this.http.get<EmployeeInfo>(this.FETCH_END_USER_DOMAINS);
  }

  insertEndUserDetails(employeeInfo: EmployeeInfo): Observable<void> {
    return this.http.post<void>(this.INSERT_END_USER_DETAILS, employeeInfo);

  }

}
