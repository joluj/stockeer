import { Pipe, PipeTransform } from '@angular/core';
import { type QuantityDto } from '@stockeer/dtos';
import { Unit } from '@stockeer/types';

@Pipe({
  name: 'quantity',
})
export class QuantityPipe implements PipeTransform {
  transform(value: QuantityDto): unknown {
    const stringMap: Record<Unit, string> = {
      [Unit.KG]: ' kg',
      [Unit.ML]: ' ml',
      [Unit.PIECE]: '',
    };

    const unit = stringMap[value.unit] ?? value.unit.toString();

    return value.amount + unit;
  }
}
