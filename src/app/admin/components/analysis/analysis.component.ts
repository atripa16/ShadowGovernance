import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbAccordion, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest } from 'rxjs';
import { FilterModel } from 'src/app/admin/models/Filters.model';
import { AnalysisApiService } from 'src/app/admin/services/analysis-api.service';
import { CommonDomainsModel } from 'src/app/shared/models/common-domains.model';
import { CommonDomainsApiService } from 'src/app/shared/services/common-domains-api.service';
import { RequestFilterModel } from '../../models/RequestFilter.model';
import { NgForm } from '@angular/forms';
import { Excel } from '../Enum/Excel.enum';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit, AfterViewInit, AfterViewChecked {

  resultTable: any[] = [];
  commonDomainsModel: CommonDomainsModel = {} as CommonDomainsModel;
  page = 1;
  pageSize = 10;
  collectionSize = this.resultTable.length;
  filter: FilterModel = { bu: null, from: null, task: null, to: null };
  isFilterClicked = false;
  activeIds = [];
  @ViewChild('filterAccordion') filterAccordion: NgbAccordion;
  readonly DELIMITER = '/';
  currentPage = 0;

  constructor(
    private analysisService: AnalysisApiService,
    private commonDomainsApiService: CommonDomainsApiService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewInit(): void {
    this.filterAccordion.expandAll();
  }

  ngOnInit() {
    this.commonDomainsApiService.loadCommonDomains().subscribe((commonDomainsModel: CommonDomainsModel) => {
      this.commonDomainsModel = commonDomainsModel;
    });
  }

  clear(filterForm: NgForm): void {
    filterForm.resetForm();
  }

  search(page?: number) {
    if (page) {
      this.page = page;

    }
    this.isFilterClicked = true;
    const requestModel: RequestFilterModel = this.getDataInValidFormat(this.filter);

    combineLatest(this.analysisService.getAnalysisResultTotalCount(requestModel), this.analysisService.getAnalysisResult(requestModel)).
      subscribe(([recordCount, results]: [number, any]) => {
        this.resultTable = results;
        this.collectionSize = recordCount;
      });
  }

  getDataInValidFormat(filterModel: FilterModel): RequestFilterModel {
    const requestModel = {} as RequestFilterModel;
    requestModel.bu = filterModel.bu ? filterModel.bu : '';
    requestModel.pageSize = this.pageSize;
    requestModel.from = this.formatDate(filterModel.from);
    requestModel.task = filterModel.task ? filterModel.task : '';
    requestModel.to = this.formatDate(filterModel.to);
    requestModel.startIndex = this.page - 1;
    return requestModel;
  }

  formatDate(date: NgbDateStruct | null): string {
    return date ? date.year + this.DELIMITER + date.month + this.DELIMITER + date.day : '';
  }

  excelDownload() {
    const requestModel: RequestFilterModel = this.getDataInValidFormat(this.filter);

    this.analysisService.downloadExcelFile(requestModel).subscribe(
      (excelBlob) => { this.downloadFile(excelBlob); }
    );
  }
  downloadFile(data: any) {
    const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
    const element = document.createElement('a');
    element.href = window.URL.createObjectURL(blob);
    element.download = Excel.excelName;
    document.body.appendChild(element);
    element.click();
  }
}
