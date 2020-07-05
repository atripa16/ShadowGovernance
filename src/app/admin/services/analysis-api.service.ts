import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilterModel } from '../models/Filters.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalysisApiService {

  readonly FETCH_ANALYSIS_DOMAINS = environment.apiUrl + '/admin/AnalysisResultTable.json';

  constructor(private http: HttpClient) { }

  getAnalysisResult(filters: FilterModel) {
    return this.http.get(this.FETCH_ANALYSIS_DOMAINS);//;,filters);
  }
}
