import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilterModel } from '../models/Filters.model';
import { AdminDomainsModel } from '../models/admin-domains.model';

@Injectable()
export class AnalysisApiService {

  readonly FETCH_ANALYSIS_DOMAINS = 'assets/mock/admin/AnalysisResultTable.json';
  readonly LOAD_ADD_USERS_DOMAINS = environment.apiUrl + '/loadBusinessUnits';


  constructor(
    private http: HttpClient
  ) { }


  loadAnalysisDomains(): Observable<AdminDomainsModel> {
    return this.http.get<AdminDomainsModel>(this.LOAD_ADD_USERS_DOMAINS);
  }

  getAnalysisResult(filters: FilterModel): Observable<any> {
    // return this.http.post(this.FETCH_ANALYSIS_DOMAINS, filters);
    return this.http.get<any>(this.FETCH_ANALYSIS_DOMAINS);
  }
}
