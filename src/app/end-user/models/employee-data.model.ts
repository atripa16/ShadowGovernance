import { TaskDescription } from './task-description.model';

export interface EmployeeInfo {
    bu: string;
    capgId: string;
    email: string;
    isShadow: boolean;
    name: string;
    projName: string;
    mentorName: string;
    taskDesc: TaskDescription[];
    date: string[];
}
