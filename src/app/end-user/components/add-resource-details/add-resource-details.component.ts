import { Component, OnInit } from '@angular/core';
import { EndUserDomainsApiService } from '../../services/end-user-domains-api.service';
import { OptionModel } from 'src/app/core/models/option.model';
import { AddUserDomainsModel } from '../../models/add-user-domains.model';

@Component({
  selector: 'app-add-resource-details',
  templateUrl: './add-resource-details.component.html',
  styleUrls: ['./add-resource-details.component.scss']
})
export class AddResourceDetailsComponent implements OnInit {

  addUserDomainsModel: AddUserDomainsModel = {} as AddUserDomainsModel;

  constructor(
    private endUserDomainsApiService: EndUserDomainsApiService
  ) { }

  ngOnInit() {
    this.endUserDomainsApiService.loadAddUsersDomains().subscribe((addUserDomains: AddUserDomainsModel) => {
      this.addUserDomainsModel = addUserDomains;
    });
  }

}
