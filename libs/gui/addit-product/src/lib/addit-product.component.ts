import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';
import { GroupResolverFormBuilder } from '@ngneat/reactive-forms/lib/form-builder';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { Unit } from '@stockeer/types';
import { Product } from '@stockeer/store';
import { Optional } from 'utility-types';
import { BarcodeScannerService } from '@stockeer/services';
import { Platform } from '@ionic/angular';
import { AlertService } from '@stockeer/services';

export type ProductOptionalId = Omit<Optional<Product, 'id'>, 'storageId'>;

interface ProductForm {
  id: string | undefined;
  name: (string | ((control: AbstractControl) => ValidationErrors))[];
  expiryDate: string;
  amount: number;
  unit: Unit;
  barcode: string;
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
    this.productForm.controls.barcode.setValue(value?.barcode ?? '');

    this.isAdd = value == undefined || value.id == undefined;
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
    private readonly barcodeScannerService: BarcodeScannerService,
    private readonly platform: Platform,
    private readonly alertService: AlertService
  ) {
    this.save = new EventEmitter();
    this.productForm = this.formBuilder.group<ProductForm>({
      id: undefined,
      name: ['', Validators.required],
      expiryDate: new Date().toISOString(),
      amount: 0,
      unit: Unit.PIECE,
      barcode: '',
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
      barcode: form.barcode,
    };

    this.save.emit(formResult);
  }

  async triggerBarcodeScan() {
    if (!this.platform.is('android')) {
      const { isPresent } = await this.alertService.ok({
        message: 'The barcode scanner is only available on Android.',
      });
      await isPresent;
      return;
    }
    const barcode = await this.barcodeScannerService.scan();
    if (barcode) {
      this.productForm.controls.barcode.setValue(barcode);
    }
  }
}
