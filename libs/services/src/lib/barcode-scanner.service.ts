import { Injectable } from '@angular/core';
import { PermissionsService } from './permissions.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Platform } from '@ionic/angular';
import { finalize, firstValueFrom, from, race, Subject, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BarcodeScannerService {
  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly platform: Platform
  ) {}

  /**
   * Returns the barcode or null
   * @throws nothing
   */
  async scan(): Promise<string | null> {
    // TODO suppress back button
    if (!(await this.permissionsService.hasPermission('CAMERA'))) {
      console.error('No camera permission');
      return null;
    }
    if (!(await BarcodeScanner.checkPermission({ force: true }))) {
      console.error('No camera permission (Scanner)');
      return null;
    }

    const backPressed = new Subject<null>();
    const subscription = this.platform.backButton.subscribeWithPriority(
      -1,
      () => {
        subscription?.unsubscribe();
        backPressed.next(null);
      }
    );

    document.body.classList.add('scanner-open');

    return firstValueFrom(
      race([
        backPressed,
        from(BarcodeScanner.startScan().then((o) => o.content ?? null)),
      ]).pipe(
        take(1),
        finalize(() => {
          document.body.classList.remove('scanner-open');
          subscription?.unsubscribe();
        })
      )
    );
  }
}
