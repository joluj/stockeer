import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AddProductComponent } from './add-product.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

export default {
  title: 'AddProductComponent',
  component: AddProductComponent,
  decorators: [
    moduleMetadata({
      imports: [IonicModule.forRoot(), FormsModule],
    }),
  ],
} as Meta<AddProductComponent>;

const Template: Story<AddProductComponent> = (args: AddProductComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  product: null,
};
