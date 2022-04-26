import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';
import { GroupResolverFormBuilder } from '@ngneat/reactive-forms/lib/form-builder';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { IProduct, Unit } from '@stockeer/types';

export type ProductOptionalId = Omit<IProduct, 'id' | 'storageId'> & {
  id?: string;
  storageId?: string;
};

interface ProductForm {
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
  set product(value: ProductOptionalId | undefined) {
    this.productForm.controls.name.setValue(value?.name);
    this.productForm.controls.expiryDate.setValue(value?.expiryDate);
    this.productForm.controls.amount.setValue(value?.quantity.amount);
    this.productForm.controls.unit.setValue(value?.quantity.unit ?? Unit.PIECE);

    this.isAdd = value == null;
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
  isAdd: boolean;

  constructor(private readonly formBuilder: FormBuilder) {
    this.save = new EventEmitter();
    this.productForm = this.formBuilder.group<ProductForm>({
      name: [null, Validators.required],
      expiryDate: null,
      amount: null,
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

    const productWithoutId = {
      name: form.name,
      expiryDate: form.expiryDate,
      quantity: {
        amount: form.amount ?? 1,
        unit: form.unit,
      },
    };

    // In the edit case, also emit the id.
    this.save.emit(
      this.product
        ? { id: this.product.id, ...productWithoutId }
        : productWithoutId
    );
  }
}
