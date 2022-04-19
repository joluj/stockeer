import { UserRole } from './UserRole';

export interface IUser {
  id: number;
  username: string;
  role: UserRole;
  passwordHash: string | null;
  creationTime: Date;
  editedTime: Date;
}
