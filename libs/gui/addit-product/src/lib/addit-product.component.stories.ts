import { moduleMetadata, Story, Meta } from '@storybook/angular';
import {
  AdditProductComponent,
  ProductOptionalId,
} from './addit-product.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Unit } from '@stockeer/types';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

export default {
  title: 'AdditProductComponent',
  component: AdditProductComponent,
  decorators: [
    moduleMetadata({
      imports: [IonicModule.forRoot(), FormsModule, ReactiveFormsModule],
      providers: [AndroidPermissions],
    }),
  ],
} as Meta<AdditProductComponent>;

const Template: Story<AdditProductComponent> = (
  args: AdditProductComponent
) => ({
  props: args,
});

const product: ProductOptionalId = {
  id: '0',
  name: 'Banana',
  expiryDate: '2022-04-16',
  quantity: { amount: 1, unit: Unit.PIECE },
  barcode: '12345678',
};

export const Primary = Template.bind({});
Primary.args = {
  product,
};
