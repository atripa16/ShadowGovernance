import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginModel } from '../models/login.model';
import { User } from '../models/user.model';
import { ChangePasswordModel } from 'src/app/admin/models/change-password.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationApiService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  readonly CHANGE_PASSWORD_URL = environment.apiUrl + '/changePassword';
  readonly LOGIN_URL = environment.apiUrl + '/authenticate';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get currentUserObservable(): Observable<User> {
    return this.currentUserSubject.asObservable();
  }

  login(loginInfo: LoginModel): Observable<User> {
    return this.http.post<User>(this.LOGIN_URL, loginInfo)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  changePassword(passwordInfo: ChangePasswordModel): Observable<string> {
    return this.http.post(this.CHANGE_PASSWORD_URL, passwordInfo, {responseType: 'text'});
  }
}
