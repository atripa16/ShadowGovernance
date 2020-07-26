import { ErrorHandler, Injector, Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ErrorComponent } from '../components/error/error.component';
import { Errors } from '../enums/errors.enum';
import { Router } from '@angular/router';
import { AuthenticationApiService } from 'src/app/core/services/authentication-api.service';

@Injectable({
    providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

    private ngbModal: NgbModal;
    private router: Router;
    private authenticationApiService: AuthenticationApiService;

    constructor(
        private injector: Injector
    ) { }

    handleError(error: Error) {
        this.ngbModal = this.injector.get(NgbModal);
        this.router = this.injector.get(Router);
        this.authenticationApiService = this.injector.get(AuthenticationApiService);
        if (error.message.includes(Errors.NOT_AUTHORIZE)) {
            this.authenticationApiService.logout();
            this.openModal('You are not Authorize to access the url.');
            this.router.navigate(['end-user']);
        } else if (error.message.includes(Errors.NOT_AUTHENTICATED)) {
            this.openModal('Please Login to continue');
            this.router.navigate(['end-user']);
        }
        throw error;
    }

    private openModal(message: string) {
        const ngbModalRef: NgbModalRef = this.ngbModal.open(ErrorComponent,
            { centered: true, backdrop: 'static', keyboard: false });
        ngbModalRef.componentInstance.errorMessage = message;
    }
}
