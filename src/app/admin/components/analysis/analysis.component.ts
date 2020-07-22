import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { FilterModel } from 'src/app/admin/models/Filters.model';
import { AnalysisApiService } from 'src/app/admin/services/analysis-api.service';
import { AddUserDomainsModel } from 'src/app/end-user/models/add-user-domains.model';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit, AfterViewInit, AfterViewChecked {

  resultTable: any[] = [];
  addUserDomainsModel: AddUserDomainsModel = {} as AddUserDomainsModel;
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
    this.analysisService.loadAnalysisDomains().subscribe((addUserDomains: AddUserDomainsModel) => {
      this.addUserDomainsModel = addUserDomains;
    });
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
