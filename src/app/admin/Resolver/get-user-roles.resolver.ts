import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable,of, empty } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { AddUserApiService } from '../services/add-user-api.service';
import { Injectable } from '@angular/core';
import { OptionModel } from 'src/app/core/models/option.model';

@Injectable({
    providedIn: 'root'
  })
export class GetUserRole implements Resolve<OptionModel[]> {


    constructor(private addUser: AddUserApiService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<OptionModel[]> {
        return this.addUser.getRoles().pipe(map(data=> data),
             catchError((error) => {
                 return empty();
             }));
    }


}