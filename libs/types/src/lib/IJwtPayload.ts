import { UserRole } from './UserRole';

/**
 * Data that is contained in a JWT created by the backend.
 */
export interface IJwtPayload {
  /**
   * UserId
   */
  sub: number;
  role: UserRole;
  username: string;

  /**
   * Issued at: EPOCH Time der Erstellung
   */
  iat: number;
  /**
   * Expires: EPOCH Time wann das JWT ungültig wird
   */
  exp: number;
}
