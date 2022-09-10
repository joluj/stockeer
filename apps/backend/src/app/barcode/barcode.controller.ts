import { Controller, Get, Param } from '@nestjs/common';
import { BarcodeService } from './barcode.service';

@Controller('barcodes')
export class BarcodeController {
  constructor(private readonly barcodeService: BarcodeService) {}

  @Get(':barcode')
  async get(@Param('barcode') barcode: string): Promise<string | undefined> {
    return this.barcodeService.find(barcode);
  }
}
