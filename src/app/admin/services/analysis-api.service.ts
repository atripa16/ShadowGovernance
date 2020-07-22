import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilterModel } from '../models/Filters.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AddUserDomainsModel } from 'src/app/end-user/models/add-user-domains.model';

@Injectable()
export class AnalysisApiService {

  readonly FETCH_ANALYSIS_DOMAINS = environment.apiUrl + '/admin/analysisResultTable.json';
  readonly LOAD_ADD_USERS_DOMAINS = environment.apiUrl + '/loadBusinessUnits';


  constructor(private http: HttpClient) { }


  loadAnalysisDomains(): Observable<AddUserDomainsModel> {
    return this.http.get<AddUserDomainsModel>(this.LOAD_ADD_USERS_DOMAINS);
  }

  getAnalysisResult(filters: FilterModel): Observable<any> {
    // return this.http.post(this.FETCH_ANALYSIS_DOMAINS, filters);
    return this.http.get<any>(this.FETCH_ANALYSIS_DOMAINS);
  }
}
