import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { empty, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { OptionModel } from 'src/app/core/models/option.model';
import { AddUserApiService } from '../services/add-user-api.service';

@Injectable({
    providedIn: 'root'
})
export class GetUserRole implements Resolve<OptionModel[]> {


    constructor(private addUser: AddUserApiService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<OptionModel[]> {
        return this.addUser.getRoles().pipe(map(data => data),
            catchError((error) => {
                return empty();
            }));
    }
}
