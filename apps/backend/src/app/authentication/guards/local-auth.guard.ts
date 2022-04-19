import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Dieser Guard wird für Endpunkte verwendet, bei denen der Caller seinen Username und sein Passwort sendet,
 * um sich zu authorisieren.
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
