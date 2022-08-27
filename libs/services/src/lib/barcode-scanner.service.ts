import { Injectable } from '@angular/core';
import { PermissionsService } from '@stockeer/services';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Injectable({ providedIn: 'root' })
export class BarcodeScannerService {
  constructor(private readonly permissionsService: PermissionsService) {}

  /**
   * Returns the barcode or null
   * @throws nothing
   */
  async scan(): Promise<string | null> {
    // TODO suppress back button
    if (
      !(await this.permissionsService.hasPermission('CAMERA')) &&
      !(await BarcodeScanner.checkPermission({ force: true }))
    ) {
      console.error('No camera permission');
      return null;
    }

    let result: string | null = null;
    try {
      document.body.classList.add('scanner-open');

      result = (await BarcodeScanner.startScan()).content ?? null;
    } finally {
      document.body.classList.remove('scanner-open');
    }

    return result;
  }
}
