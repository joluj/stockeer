import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';
import { GroupResolverFormBuilder } from '@ngneat/reactive-forms/lib/form-builder';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { Unit } from '@stockeer/types';
import { Product, Stockeer } from '@stockeer/store';
import { Optional } from 'utility-types';
import {
  AlertService,
  BarcodeScannerService,
  BarcodeService,
} from '@stockeer/services';
import {
  IonInput,
  Platform,
  DatetimeCustomEvent,
  IonModal,
} from '@ionic/angular';
import { catchError, of, timeout, TimeoutError } from 'rxjs';

export type ProductOptionalId = Optional<Product, 'id'>;

interface ProductForm {
  id: string | undefined;
  name: (string | ((control: AbstractControl) => ValidationErrors))[];
  expiryDate: string;
  amount: number;
  unit: Unit;
  barcode: string;
  storageId: [string, (control: AbstractControl) => ValidationErrors];
}

@Component({
  selector: 'stockeer-add-product',
  templateUrl: './addit-product.component.html',
  styleUrls: ['./addit-product.component.scss'],
})
export class AdditProductComponent implements OnChanges {
  @Input()
  set product(value: ProductOptionalId | Product | undefined) {
    this.productForm.controls.id.setValue(value?.id);
    this.productForm.controls.name.setValue(value?.name ?? '');
    this.productForm.controls.expiryDate.setValue(value?.expiryDate ?? '');
    this.productForm.controls.amount.setValue(value?.quantity.amount ?? 0);
    this.productForm.controls.unit.setValue(value?.quantity.unit ?? Unit.PIECE);
    this.productForm.controls.barcode.setValue(value?.barcode ?? '');
    this.productForm.controls.storageId.setValue(value?.storageId ?? '');

    this.isAdd = value == undefined || value.id == undefined;
  }

  @Input()
  stockeers: Stockeer[];

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

  @ViewChild('nameInput')
  nameInput?: IonInput;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly barcodeScannerService: BarcodeScannerService,
    private readonly platform: Platform,
    private readonly alertService: AlertService,
    private readonly barcodeService: BarcodeService
  ) {
    this.save = new EventEmitter();
    this.productForm = this.formBuilder.group<ProductForm>({
      id: undefined,
      name: ['', Validators.required],
      expiryDate: new Date().toISOString(),
      amount: 0,
      unit: Unit.PIECE,
      barcode: '',
      storageId: ['', Validators.required],
    });
    this.Unit = Unit;
    this.stockeers = [];

    setTimeout(async () => {
      await this.nameInput?.setFocus();
    }, 100);
  }

  ngOnChanges() {
    if (
      !this.productForm.controls.storageId.value &&
      this.stockeers.length > 0
    ) {
      console.log('hi');
      this.productForm.controls.storageId.setValue(this.stockeers[0].id);
    }
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
      storageId: form.storageId,
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

      if (!this.productForm.controls.name.value) {
        this.barcodeService
          .loadBarcode$(barcode)
          .pipe(
            timeout(2500),
            catchError((e) => {
              if (!(e instanceof TimeoutError)) {
                console.error(e);
              }
              return of(undefined);
            })
          )
          .subscribe((name) => {
            if (name) {
              this.productForm.controls.name.setValue(name);
            }
          });
      }
    }
  }

  updateExpiryDate(event: Event, modal: IonModal) {
    function isDatetimeCustomEvent(event: Event): event is DatetimeCustomEvent {
      return event.type === 'ionChange';
    }

    if (!isDatetimeCustomEvent(event)) {
      console.error('Event is not a DateTime event', event);
      return;
    }

    const newDate = event.detail.value;
    if (typeof newDate !== 'string') {
      console.error('Event value must be a string', event);
      return;
    }

    this.productForm.controls.expiryDate.setValue(newDate);
    void modal.dismiss();
  }
}
