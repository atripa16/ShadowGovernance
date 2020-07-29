import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorComponent } from '../modals/error/error.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(
    private ngbModal: NgbModal
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        if (httpErrorResponse.status > 400) {
          const ngbModalRef: NgbModalRef = this.ngbModal.open(ErrorComponent,
            { centered: true, backdrop: 'static', keyboard: false });
          ngbModalRef.componentInstance.errorMessage = httpErrorResponse.error.message;
        }
        return throwError(httpErrorResponse);
      })
    );
  }
}
