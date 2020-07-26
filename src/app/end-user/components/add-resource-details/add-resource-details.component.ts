import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { CommonDomainsModel } from 'src/app/shared/models/common-domains.model';
import { CommonDomainsApiService } from 'src/app/shared/services/common-domains-api.service';
import { EmployeeInfo } from '../../models/employee-data.model';
import { TaskDescription } from '../../models/task-description.model';
import { WeekModel } from '../../models/week.model';
import { EndUserApiService } from '../../services/end-user-api.service';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SuccessComponent } from 'src/app/home/components/success/success.component';

@Component({
  selector: 'app-add-resource-details',
  templateUrl: './add-resource-details.component.html',
  styleUrls: ['./add-resource-details.component.scss']
})
export class AddResourceDetailsComponent implements OnInit {

  commonDomainsModel: CommonDomainsModel = {} as CommonDomainsModel;
  employeeInfo: EmployeeInfo = {} as EmployeeInfo;
  currWeekInfo: WeekModel[] = [
    { date: null, day: null },
    { date: null, day: null },
    { date: null, day: null },
    { date: null, day: null },
    { date: null, day: null }
  ];
  isFetchDisabled = true;
  isRemoveTaskDisabled: boolean;
  inShadow: boolean;
  calendarDays = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
  ];
  fresherDetails = new FormGroup({
    capgId: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    bu: new FormControl(''),
    isShadow: new FormControl('false'),
    projName: new FormControl(''),
    mentorName: new FormControl(''),
    taskDesc: new FormArray([this.createRow()])
  });
  taskArr: FormArray;

  constructor(
    private endUserApiService: EndUserApiService,
    private ngbModal: NgbModal,
    private commonDomainsApiService: CommonDomainsApiService
  ) { }

  currDatesArray(): string[] {
    const currentWeekDates: string[] = [];
    this.currWeekInfo.forEach((currDay) => {
      currentWeekDates.push(currDay.date);
    });
    return currentWeekDates;
  }

  isTaskFieldDisabled(date: string): boolean {
    return moment(date, 'YYYY-MM-DD').isAfter(moment());
  }

  isNextTaskButtonDisabled(date: string): boolean {
    for (let i = 0; i < 7; i++) {
      if (moment(date, 'YYYY-MM-DD').add(i + 1, 'days').isAfter(moment()) === true) {
        return true;
      }
    }
  }

  ngOnInit() {
    this.commonDomainsApiService.loadCommonDomains().subscribe((commonDomainsModel: CommonDomainsModel) => {
      this.commonDomainsModel = commonDomainsModel;
    });
    const now = moment();
    // If it's sunday then show previous week records
    if (now.get('day') === 0) {
      this.setCurrWeekInfo(moment(now).subtract(2, 'days'));
    } else {
      this.setCurrWeekInfo(now);
    }
    this.fresherDetails.valueChanges.subscribe((formData) => {
      if (formData.capgId) {
        this.isFetchDisabled = false;
      } else {
        this.isFetchDisabled = true;
      }
      if (formData.taskDesc.length > 1) {
        this.isRemoveTaskDisabled = false;
      } else {
        this.isRemoveTaskDisabled = true;
      }
    });
  }

  setShadow(isShadow: string) {
    if (isShadow === 'true') {
      this.inShadow = true;
    } else {
      this.inShadow = false;
    }
  }

  createRow() {
    return new FormGroup({
      monday: new FormControl(),
      tuesday: new FormControl(),
      wednesday: new FormControl(),
      thursday: new FormControl(),
      friday: new FormControl(),
    });
  }

  addRow() {
    this.taskArr = this.fresherDetails.get('taskDesc') as FormArray;
    this.taskArr.push(this.createRow());
  }

  deleteRow() {
    this.taskArr = this.fresherDetails.get('taskDesc') as FormArray;
    this.taskArr.removeAt(this.taskArr.length - 1);
  }

  prev() {
    this.setCurrWeekInfo(moment(this.currWeekInfo[0].date, 'YYYY-MM-DD').subtract(2, 'days'));
    this.endUserApiService.loadCurrWeekTasks(this.fresherDetails.controls.capgId.value, this.currDatesArray())
      .subscribe((taskInfo: TaskDescription[]) => {
        this.setTaskData(taskInfo);
      });
  }

  next() {
    this.setCurrWeekInfo(moment(this.currWeekInfo[4].date, 'YYYY-MM-DD').add(2, 'days'));
    this.endUserApiService.loadCurrWeekTasks(this.fresherDetails.controls.capgId.value, this.currDatesArray())
      .subscribe((taskInfo: TaskDescription[]) => {
        this.setTaskData(taskInfo);
      });
  }

  setCurrWeekInfo(currentDate: moment.Moment) {
    for (let index = 0; index < 5; index++) {
      this.currWeekInfo[index].day = this.calendarDays[index];
      this.currWeekInfo[index].date = currentDate.clone().startOf('week').add(index + 1, 'day').format('YYYY-MM-DD');
    }
  }

  fetchEmpData(): void {
    this.endUserApiService.fetchEndUserDetails(this.fresherDetails.controls.capgId.value,
      this.currDatesArray()).subscribe((empData: EmployeeInfo) => {
        this.patchFormData(empData);
        this.fresherDetails.controls.name.setValue(empData.name);
        this.fresherDetails.controls.email.setValue(empData.email);
        this.fresherDetails.controls.bu.setValue(empData.bu);
        this.fresherDetails.controls.isShadow.setValue(empData.isShadow);
        this.fresherDetails.controls.projName.setValue(empData.projName);
        this.fresherDetails.controls.mentorName.setValue(empData.mentorName);
        this.fresherDetails.controls.taskDesc.setValue(empData.taskDesc);
      });
  }

  patchFormData(empData: EmployeeInfo): void {
    this.fresherDetails.patchValue({
      name: empData.name,
      email: empData.email,
      bu: empData.bu,
      isShadow: empData.isShadow,
      projName: empData.projName,
      mentorName: empData.mentorName,
    });
    this.setTaskData(empData.taskDesc);
  }

  setTaskData(taskInfo: TaskDescription[]): void {
    const taskDetails: any[] = [];
    taskInfo.forEach(currTask => {
      const taskDetail = {};
      taskDetail['friday'] = currTask.friday.description;
      taskDetail['monday'] = currTask.monday.description;
      taskDetail['tuesday'] = currTask.tuesday.description;
      taskDetail['wednesday'] = currTask.wednesday.description;
      taskDetail['thursday'] = currTask.thursday.description;
      taskDetails.push(taskDetail);

    });
    this.fresherDetails.controls.taskDesc.patchValue(taskDetails);
  }

  insertEmpData() {
    this.employeeInfo = { ...this.fresherDetails.value };
    this.employeeInfo.date = this.currDatesArray();
    this.endUserApiService.insertEndUserDetails(this.employeeInfo).subscribe(() => {
      const ngbModalRef: NgbModalRef = this.ngbModal.open(SuccessComponent, { centered: true, backdrop: 'static', keyboard: false });
      ngbModalRef.componentInstance.successMessage = 'Details Inserted Successfully!';
    });
  }

}
