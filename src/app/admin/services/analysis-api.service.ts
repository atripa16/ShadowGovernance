import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestFilterModel } from '../models/RequestFilter.model';

@Injectable()
export class AnalysisApiService {

  readonly FETCH_ANALYSIS_DOMAINS = 'assets/mock/admin/AnalysisResultTable.json';
  readonly LOAD_ADD_USERS_DOMAINS = environment.apiUrl + '/loadBusinessUnits';
  readonly FETCH_ANALYSIS_RESULT_COUNT = environment.apiUrl + '/getTotalCount';


  constructor(
    private http: HttpClient
  ) { }

  getAnalysisResult(filters: RequestFilterModel): Observable<any> {
    // return this.http.post(this.FETCH_ANALYSIS_DOMAINS, filters);
    return this.http.get<any>(this.FETCH_ANALYSIS_DOMAINS);
  }

  getAnalysisResultTotalCount(filters: RequestFilterModel): Observable<number> {
    return of(40);
    // return this.http.post<number>(this.FETCH_ANALYSIS_RESULT_COUNT,filters);
  }

}
