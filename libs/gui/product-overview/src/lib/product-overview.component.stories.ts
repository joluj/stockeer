import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ProductOverviewComponent } from './product-overview.component';
import { IonicModule } from '@ionic/angular';

export default {
  title: 'ItemOverviewComponent',
  component: ProductOverviewComponent,
  decorators: [
    moduleMetadata({
      imports: [IonicModule.forRoot()],
    }),
  ],
} as Meta<ProductOverviewComponent>;

const Template: Story<ProductOverviewComponent> = (
  args: ProductOverviewComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
