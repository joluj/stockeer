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
   * Specifies if this component acts as an add-component,
   * or as an edit-component.
   */
  @Input()
  add: boolean;

  /**
   * If {@link add} is true, this product is null, otherwise
   * it contains the product that may be edited.
   */
  @Input()
  product?: ProductOptionalId;

  /**
   * Emits the product created from the input-values.
   * If {@link add} is true, the id is not specified (add case).
   * Otherwise, the product emitted holds the id of the
   * input {@link product} (edit case).
   */
  @Output()
  addEditEmitter: EventEmitter<ProductOptionalId>;

  /**
   * A {@link FormGroup} representing {@link product}.
   */
  productForm: FormGroup<GroupResolverFormBuilder<ProductForm>>;

  // Used to access the values of the Unit-enum.
  Unit;

  constructor(private readonly formBuilder: FormBuilder) {
    this.add = true;
    this.addEditEmitter = new EventEmitter();
    this.productForm = this.formBuilder.group<ProductForm>({
      name: [this.product?.name, Validators.required],
      expiryDate: this.product?.expiryDate,
      amount: this.product?.quantity.amount,
      unit: this.product?.quantity.unit ?? Unit.PIECE,
    });
    this.Unit = Unit;
  }

  emitProduct() {
    const productWithoutId = {
      name: this.productForm.controls.name.value,
      expiryDate: this.productForm.controls.expiryDate.value,
      quantity: {
        amount: this.productForm.controls.amount.value ?? 1,
        unit: this.productForm.controls.unit.value,
      },
    };

    // In the edit case, also emit the id.
    this.addEditEmitter.emit(
      this.product
        ? { id: this.product.id, ...productWithoutId }
        : productWithoutId
    );
  }
}
