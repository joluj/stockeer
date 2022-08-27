import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';
import { GroupResolverFormBuilder } from '@ngneat/reactive-forms/lib/form-builder';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { Unit } from '@stockeer/types';
import { Product } from '@stockeer/store';
import { Optional } from 'utility-types';
import { BarcodeScannerService } from '../../../../services/src/lib/barcode-scanner.service';

export type ProductOptionalId = Optional<Product, 'id'>;

interface ProductForm {
  id: string | undefined;
  name: (string | ((control: AbstractControl) => ValidationErrors))[];
  expiryDate: string;
  amount: number;
  unit: Unit;
}

@Component({
  selector: 'stockeer-add-product',
  templateUrl: './addit-product.component.html',
  styleUrls: ['./addit-product.component.scss'],
})
export class AdditProductComponent {
  @Input()
  set product(value: ProductOptionalId | Product | undefined) {
    this.productForm.controls.id.setValue(value?.id);
    this.productForm.controls.name.setValue(value?.name ?? '');
    this.productForm.controls.expiryDate.setValue(value?.expiryDate ?? '');
    this.productForm.controls.amount.setValue(value?.quantity.amount ?? 0);
    this.productForm.controls.unit.setValue(value?.quantity.unit ?? Unit.PIECE);

    this.isAdd = !!(value && value.id);
  }

  /**
   * Emits the product created from the input-values.
   * If {@link isAdd} is true, the id is not specified (add case).
   * Otherwise, the product emitted holds the id of the
   * input {@link product} (edit case).
   */
  @Output()
  save: EventEmitter<ProductOptionalId>;

  /**
   * A {@link FormGroup} representing {@link product}.
   */
  productForm: FormGroup<GroupResolverFormBuilder<ProductForm>>;

  /**
   * Used to access the values of the Unit-enum.
   */
  Unit: typeof Unit;

  /**
   * Specifies if this component acts as an add-component,
   * or as an edit-component.
   */
  isAdd = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly barcodeScannerService: BarcodeScannerService
  ) {
    this.save = new EventEmitter();
    this.productForm = this.formBuilder.group<ProductForm>({
      id: undefined,
      name: ['', Validators.required],
      expiryDate: new Date().toISOString(),
      amount: 0,
      unit: Unit.PIECE,
    });
    this.Unit = Unit;
  }

  validateAndEmitProduct() {
    this.productForm.markAllAsTouched();
    if (!this.productForm.valid) {
      return;
    }

    const form = this.productForm.value;

    const formResult: ProductOptionalId = {
      id: form.id, // might be undefined, but doesn't matter
      name: form.name,
      expiryDate: form.expiryDate,
      quantity: {
        amount: form.amount,
        unit: form.unit,
      },
    };

    this.save.emit(formResult);
  }

  async triggerBarcodeScan() {
    // TODO disallow on web
    const barcode = await this.barcodeScannerService.scan();
    console.log(barcode); // TODO
  }
}
