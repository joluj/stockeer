import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ItemOverviewComponent } from './item-overview.component';
import { IonicModule } from '@ionic/angular';

export default {
  title: 'ItemOverviewComponent',
  component: ItemOverviewComponent,
  decorators: [
    moduleMetadata({
      imports: [IonicModule.forRoot()],
    }),
  ],
} as Meta<ItemOverviewComponent>;

const Template: Story<ItemOverviewComponent> = (
  args: ItemOverviewComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
