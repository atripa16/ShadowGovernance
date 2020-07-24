import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { AddUserDomainsModel } from '../../models/add-user-domains.model';
import { EmployeeInfo } from '../../models/employee-data.model';
import { WeekModel } from '../../models/week.model';
import { EndUserDomainsApiService } from '../../services/end-user-domains-api.service';
import { AddUserApiService } from 'src/app/admin/services/add-user-api.service';
import { EndUserApiService } from '../../services/end-user-api.service';
import { TaskDescription } from '../../models/task-description.model';

@Component({
  selector: 'app-add-resource-details',
  templateUrl: './add-resource-details.component.html',
  styleUrls: ['./add-resource-details.component.scss']
})
export class AddResourceDetailsComponent implements OnInit {

  addUserDomainsModel: AddUserDomainsModel = {} as AddUserDomainsModel;
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
    'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'
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
    private endUserDomainsApiService: EndUserDomainsApiService
  ) { }

  currDatesArray(): string[] {
    const currentWeekDates: string[] = [];
    this.currWeekInfo.forEach((currDay) => {
      currentWeekDates.push(currDay.date);
    });
    return currentWeekDates;
  }

  ngOnInit() {
    this.endUserDomainsApiService.loadAddUsersDomains().subscribe((addUserDomains: AddUserDomainsModel) => {
      this.addUserDomainsModel = addUserDomains;
    });
    const now = moment();
    this.setCurrWeekInfo(now);
    this.fresherDetails.valueChanges.subscribe((formData) => {
      console.log('formdata', formData);

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
    this.setCurrWeekInfo(moment(this.currWeekInfo[0].date, 'DD/MM/YYYY').subtract(2, 'days'));
    this.endUserApiService.loadCurrWeekTasks(this.fresherDetails.controls.capgId.value, this.currDatesArray())
      .subscribe((taskInfo: TaskDescription[]) => {
        this.setTaskData(taskInfo);
      });
  }

  next() {
    this.setCurrWeekInfo(moment(this.currWeekInfo[4].date, 'DD/MM/YYYY').add(2, 'days'));
    this.endUserApiService.loadCurrWeekTasks(this.fresherDetails.controls.capgId.value, this.currDatesArray());
  }

  setCurrWeekInfo(currentDate: moment.Moment) {
    for (let index = 0; index < 5; index++) {
      this.currWeekInfo[index].day = this.calendarDays[index];
      this.currWeekInfo[index].date = currentDate.clone().startOf('week').add(index + 1, 'day').format('DD/MM/YYYY');
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
    this.fresherDetails.patchValue({
      taskDesc: taskInfo
    });
  }

  insertEmpData() {
    this.employeeInfo = { ...this.fresherDetails.value };
    this.employeeInfo.date = this.currDatesArray();
    this.endUserApiService.insertEndUserDetails(this.employeeInfo).subscribe();
  }

}
