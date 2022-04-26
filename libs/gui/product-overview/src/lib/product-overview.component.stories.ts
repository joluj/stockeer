import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ProductOverviewComponent } from './product-overview.component';
import { IonicModule } from '@ionic/angular';
import { ProductItemModule } from '@stockeer/gui/product-item';
import { Unit } from '@stockeer/types';

export default {
  title: 'ProductOverviewComponent',
  component: ProductOverviewComponent,
  decorators: [
    moduleMetadata({
      imports: [IonicModule.forRoot(), ProductItemModule],
    }),
  ],
} as Meta<ProductOverviewComponent>;

const Template: Story<ProductOverviewComponent> = (
  args: ProductOverviewComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  products: [
    {
      id: '0',
      name: 'Banana',
      expiryDate: '2022-04-16',
      quantity: { amount: 4, unit: Unit.PIECE },
      storageId: '0',
    },
    {
      id: '1',
      name: 'Schnitzel',
      expiryDate: '2022-04-16',
      quantity: { amount: 2, unit: Unit.PIECE },
      storageId: '1',
    },
  ],
};
