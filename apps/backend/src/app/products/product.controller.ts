import { Body, Controller, Get, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto, SetProductDto } from '@stockeer/dtos';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Put()
  async set(@Body() productDto: SetProductDto): Promise<ProductDto> {
    const savedProduct = await this.productService.set({
      id: productDto.id,
      name: productDto.name,
      expiryDate: productDto.expiryDate,
      quantity: productDto.quantity,
      storageId: productDto.storageId,
      barcode: productDto.barcode,
    });

    return {
      id: savedProduct.id,
      name: savedProduct.name,
      expiryDate: savedProduct.expiryDate,
      quantity: savedProduct.quantity,
      storageId: savedProduct.storageId,
      barcode: savedProduct.barcode,
    };
  }

  @Get()
  getAll() {
    return this.productService.getAll();
  }
}
