import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { AuthenticationApiService } from 'src/app/core/services/authentication-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUser: User;
  constructor(private authenticationService: AuthenticationApiService) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
  }
}
