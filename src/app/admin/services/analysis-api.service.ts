import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilterModel } from '../models/Filters.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class AnalysisApiService {

  readonly FETCH_ANALYSIS_DOMAINS = environment.apiUrl + '/admin/analysisResultTable.json';

  constructor(private http: HttpClient) { }

  getAnalysisResult(filters: FilterModel): Observable<any> {
    // return this.http.post(this.FETCH_ANALYSIS_DOMAINS, filters);
    return this.http.get<any>(this.FETCH_ANALYSIS_DOMAINS);
  }
}
