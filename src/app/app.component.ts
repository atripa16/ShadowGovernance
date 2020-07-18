import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'ShadowGovernance';

  ngOnInit(): void {
    const now = moment();
    console.log('now', now.format());
    console.log('now', now.add(17, 'days'));


  }
}

