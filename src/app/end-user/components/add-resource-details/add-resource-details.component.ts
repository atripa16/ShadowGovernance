import { Component, OnInit } from '@angular/core';
import { EndUserDomainsApiService } from '../../services/end-user-domains-api.service';
import { OptionModel } from 'src/app/core/models/option.model';
import { AddUserDomainsModel } from '../../models/add-user-domains.model';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-resource-details',
  templateUrl: './add-resource-details.component.html',
  styleUrls: ['./add-resource-details.component.scss']
})
export class AddResourceDetailsComponent implements OnInit {

  addUserDomainsModel: AddUserDomainsModel = {} as AddUserDomainsModel;

  fresherDetails = new FormGroup({
    taskDesc: new FormArray([this.createRow()])
  })
  taskArr: FormArray;

  constructor(
    private endUserDomainsApiService: EndUserDomainsApiService
  ) { }

  ngOnInit() {
    this.endUserDomainsApiService.loadAddUsersDomains().subscribe((addUserDomains: AddUserDomainsModel) => {
      this.addUserDomainsModel = addUserDomains;
    });
  }

  createRow() {
    return new FormGroup({
      monday: new FormControl(),
      tuesday: new FormControl(),
      wednesday: new FormControl(),
      thursday: new FormControl(),
      friday: new FormControl(),
      saturday: new FormControl()
    })
  }

  addRow() {
    this.taskArr = this.fresherDetails.get('taskDesc') as FormArray;
    this.taskArr.push(this.createRow());
  }

  deleteRow() {
    
    this.taskArr = this.fresherDetails.get('taskDesc') as FormArray;
    this.taskArr.removeAt(this.taskArr.length-1);
  }

}
