import { Component, OnInit, AfterViewInit, ViewChild, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { AnalysisApiService } from 'src/app/admin/services/analysis-api.service';
import { FilterModel } from 'src/app/admin/models/Filters.model';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit, AfterViewInit, AfterViewChecked {

  resultTable: any[] = [];
  page = 1;
  pageSize = 2;
  collectionSize = this.resultTable.length;
  filter: FilterModel = {} as FilterModel;
  isFilterClicked = false;
  activeIds = [];
  @ViewChild('filterAccordion') filterAccordion: NgbAccordion;

  constructor(
    private analysisService: AnalysisApiService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewInit(): void {
   this.filterAccordion.expandAll();
  }

  ngOnInit() {
  }

  search() {
    this.isFilterClicked = true;
    this.analysisService.getAnalysisResult(this.filter).
      subscribe((results: any) => {
        this.resultTable = results;
        this.collectionSize = this.resultTable.length;
      });
  }
}
