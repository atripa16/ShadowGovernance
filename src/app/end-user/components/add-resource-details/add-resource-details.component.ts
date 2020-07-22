import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { OptionModel } from 'src/app/core/models/option.model';
import { AddUserDomainsModel } from '../../models/add-user-domains.model';
import { EmployeeInfo } from '../../models/employee-data.model';
import { WeekModel } from '../../models/week.model';
import { EndUserDomainsApiService } from '../../services/end-user-domains-api.service';

@Component({
  selector: 'app-add-resource-details',
  templateUrl: './add-resource-details.component.html',
  styleUrls: ['./add-resource-details.component.scss']
})
export class AddResourceDetailsComponent implements OnInit {

  addUserDomainsModel: AddUserDomainsModel = {} as AddUserDomainsModel;
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
    private endUserDomainsApiService: EndUserDomainsApiService
  ) { }

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
  }

  next() {
    this.setCurrWeekInfo(moment(this.currWeekInfo[4].date, 'DD/MM/YYYY').add(2, 'days'));
  }

  setCurrWeekInfo(currentDate: moment.Moment) {
    for (let index = 0; index < 5; index++) {
      this.currWeekInfo[index].day = this.calendarDays[index];
      this.currWeekInfo[index].date = currentDate.clone().startOf('week').add(index + 1, 'day').format('DD/MM/YYYY');
    }
  }

  fetchEmpData(): void {
    console.log('id', this.fresherDetails.controls.capgId.value);

    this.endUserDomainsApiService.fetchEndUserDetails(this.fresherDetails.controls.capgId.value).subscribe((empData: EmployeeInfo) => {
      this.fresherDetails.controls.name.setValue(empData.name);
      this.fresherDetails.controls.email.setValue(empData.email);
    });
  }

  insertEmpData() {
    console.log(this.fresherDetails.value);
  }

}
