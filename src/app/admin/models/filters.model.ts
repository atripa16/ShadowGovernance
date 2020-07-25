import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export interface FilterModel {
    from: NgbDateStruct;
    to: NgbDateStruct;
    bu: string;
    task: string;
}