import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddUserDomainsModel } from 'src/app/end-user/models/add-user-domains.model';
import { CommonDomainsModel } from '../models/common-domains.model';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonDomainsApiService {

  readonly LOAD_ADD_USERS_DOMAINS = environment.apiUrl + '/loadBusinessUnits';

  constructor(
    private http: HttpClient
  ) { }

  loadCommonDomains(): Observable<CommonDomainsModel> {
    return this.http.get<CommonDomainsModel>(this.LOAD_ADD_USERS_DOMAINS)
      .pipe(
        shareReplay(1)
      );
  }

}
