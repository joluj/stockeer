import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto, SetProductDto } from '@stockeer/dtos';
import { ProductEntity } from '@stockeer/entities';

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

    return ProductEntity.toDto(savedProduct);
  }

  @Get()
  getAll(): Promise<ProductDto[]> {
    return this.productService
      .getAll()
      .then((products) => products.map((p) => ProductEntity.toDto(p)));
  }

  @Delete(':productId')
  async delete(
    @Param('productId', ParseUUIDPipe) productId: string
  ): Promise<unknown> {
    await this.productService.delete(productId);
    return {};
  }
}
