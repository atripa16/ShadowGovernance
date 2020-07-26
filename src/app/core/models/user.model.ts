import { UserRoles } from '../Enum/user-roles.enum';

export interface User {
    firstName: string;
    role: UserRoles;
    token: string;
}
