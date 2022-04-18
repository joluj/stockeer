import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AdditProductComponent } from './addit-product.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export default {
  title: 'AdditProductComponent',
  component: AdditProductComponent,
  decorators: [
    moduleMetadata({
      imports: [IonicModule.forRoot(), FormsModule, ReactiveFormsModule],
    }),
  ],
} as Meta<AdditProductComponent>;

const Template: Story<AdditProductComponent> = (
  args: AdditProductComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  add: true,
  product: null,
};
