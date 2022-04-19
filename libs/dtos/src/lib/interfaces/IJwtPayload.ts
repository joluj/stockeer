import { UserRole } from '@stockeer/dtos';

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
