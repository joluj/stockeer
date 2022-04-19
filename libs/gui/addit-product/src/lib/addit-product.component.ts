import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product, Unit } from '@stockeer/entities';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';
import { GroupResolverFormBuilder } from '@ngneat/reactive-forms/lib/form-builder';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export type ProductOptionalId = Omit<Product, 'id'> & { id?: string };

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
  /**
   * If {@link isAdd} is true, this product is null, otherwise
   * it contains the product that may be edited.
   */
  @Input()
  product?: ProductOptionalId;

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

  constructor(private readonly formBuilder: FormBuilder) {
    this.save = new EventEmitter();
    this.productForm = this.formBuilder.group<ProductForm>({
      name: [this.product?.name, Validators.required],
      expiryDate: this.product?.expiryDate,
      amount: this.product?.quantity.amount,
      unit: this.product?.quantity.unit ?? Unit.PIECE,
    });
    this.Unit = Unit;
  }

  /**
   * Specifies if this component acts as an add-component,
   * or as an edit-component.
   */
  get isAdd(): boolean {
    return this.product != null;
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
