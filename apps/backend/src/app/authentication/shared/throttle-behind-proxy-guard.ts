import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { BusinessLogicException } from '../../exceptions/business-logic-exception';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  protected getTracker(req: Record<string, unknown>): string {
    if (Array.isArray(req.ips) && req.ips.length > 0) {
      return req.ips[0];
    } else if (typeof req.ip == 'string') {
      return req.ip as string;
    } else {
      throw new BusinessLogicException(
        'IP could not be extracted from request. (Required for Rate-Limiting)'
      );
    }
  }
}
