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
  productInstance?: ProductOptionalId;

  @Input()
  set product(value: ProductOptionalId | undefined) {
    this.productForm = this.formBuilder.group<ProductForm>({
      name: [value?.name, Validators.required],
      expiryDate: value?.expiryDate,
      amount: value?.quantity.amount,
      unit: value?.quantity.unit ?? Unit.PIECE,
    });
    this.isAdd = value == null;
  }

  /**
   * If {@link isAdd} is true, this product is null, otherwise
   * it contains the product that may be edited.
   */
  get product(): ProductOptionalId | undefined {
    return this.productInstance;
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

  add: boolean;

  private set isAdd(value: boolean) {
    this.add = value;
  }

  /**
   * Specifies if this component acts as an add-component,
   * or as an edit-component.
   */
  get isAdd(): boolean {
    return this.add;
  }

  constructor(private readonly formBuilder: FormBuilder) {
    this.save = new EventEmitter();
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
