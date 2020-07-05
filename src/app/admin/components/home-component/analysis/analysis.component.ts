import { Component, OnInit } from '@angular/core';
import { AnalysisApiService } from 'src/app/admin/services/analysis-api.service';
import { FilterModel } from 'src/app/admin/models/Filters.model';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {

  resultiTable: any[] = [];
  page = 1;
  pageSize = 2;
  collectionSize = this.resultiTable.length;
  filter: FilterModel = {} as FilterModel;
  isFilterClicked = false;

  constructor(
    private analysisService: AnalysisApiService) { }

  ngOnInit() {

  }

  search() {
    this.isFilterClicked = true;
    this.analysisService.getAnalysisResult(this.filter).
      subscribe((results: any) => {
        this.resultiTable = results;
        this.collectionSize = this.resultiTable.length;
      });
  }
}
