import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ProductItemComponent } from './product-item.component';
import { IonicModule } from '@ionic/angular';

export default {
  title: 'ProductItemComponent',
  component: ProductItemComponent,
  decorators: [
    moduleMetadata({
      imports: [IonicModule.forRoot()],
    }),
  ],
} as Meta<ProductItemComponent>;

const Template: Story<ProductItemComponent> = (args: ProductItemComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
