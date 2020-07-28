import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { EmployeeInfo } from '../models/employee-data.model';
import { TaskDescription } from '../models/task-description.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EndUserApiService {

  readonly LOAD_CURR_WEEK_TASKS = environment.apiUrl + '/getTasksForSelectedWeek';

  readonly FETCH_END_USER_DOMAINS = environment.apiUrl + '/getEmployee';

  readonly INSERT_END_USER_DETAILS = environment.apiUrl + '/addEmployee';

  constructor(
    private http: HttpClient
  ) { }


  fetchEndUserDetails(id: number, dates: string[]): Observable<EmployeeInfo> {
    const httpParams = new HttpParams().set('id', id.toString())
      .set('dates', dates.toString());
    return this.http.get<EmployeeInfo>(this.FETCH_END_USER_DOMAINS, {params : httpParams});
  }

  loadCurrWeekTasks(id: number, dates: string[]): Observable<TaskDescription[]> {
    const httpParams = new HttpParams().set('id', id.toString())
      .set('dates', dates.toString());
    return this.http.get<TaskDescription[]>(this.LOAD_CURR_WEEK_TASKS, { params: httpParams });
  }

  insertEndUserDetails(employeeInfo: EmployeeInfo): Observable<void> {
    return this.http.post<void>(this.INSERT_END_USER_DETAILS, employeeInfo);
  }
}
