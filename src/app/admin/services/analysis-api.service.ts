import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilterModel } from '../models/Filters.model';

@Injectable({
  providedIn: 'root'
})
export class AnalysisApiService {

  constructor(private http: HttpClient) { }

  getAnalysisResult(filters: FilterModel) {
    return this.http.get("../../../assets/JSON/AnalysisResultTable.json");//;,filters);
  }
}
