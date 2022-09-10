import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ProductItemComponent } from './product-item.component';
import { IonicModule } from '@ionic/angular';
import { Unit } from '@stockeer/types';
import { RouterTestingModule } from '@angular/router/testing';
import { QuantityPipe } from './quantity.pipe';

export default {
  title: 'ProductItemComponent',
  component: ProductItemComponent,
  decorators: [
    moduleMetadata({
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([
          { path: '**', component: ProductItemComponent },
        ]),
      ],
      declarations: [QuantityPipe],
    }),
  ],
} as Meta<ProductItemComponent>;

const Template: Story<ProductItemComponent> = (args: ProductItemComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  product: {
    id: '0',
    name: 'Banana',
    expiryDate: '2022-04-16',
    quantity: { amount: 1, unit: Unit.PIECE },
    barcode: '',
  },
};
