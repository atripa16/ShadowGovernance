import { ErrorHandler, Injector, Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ErrorComponent } from '../components/error/error.component';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    private ngbModal: NgbModal;

    constructor(
        private injector: Injector
    ) { }

    handleError(error: Error) {
        this.ngbModal = this.injector.get(NgbModal);
        const ngbModalRef: NgbModalRef = this.ngbModal.open(ErrorComponent,
            { centered: true, backdrop: 'static', keyboard: false });
        ngbModalRef.componentInstance.errorMessage = error.message;
        // throw error;
        console.log('handled', error);
    }
}
