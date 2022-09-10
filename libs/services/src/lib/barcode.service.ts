import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BarcodeService {
  constructor(private readonly http: HttpClient) {}

  loadBarcode$(barcode: string): Observable<string | undefined> {
    return this.http
      .get<{ name?: string }>(`/api/barcodes/${barcode}`)
      .pipe(map(({ name }) => name));
  }
}
