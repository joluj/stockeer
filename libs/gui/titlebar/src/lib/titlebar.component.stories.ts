import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { TitlebarComponent } from './titlebar.component';
import { IonicModule } from '@ionic/angular';

export default {
  title: 'TitlebarComponent',
  component: TitlebarComponent,
  decorators: [
    moduleMetadata({
      imports: [IonicModule.forRoot()],
    }),
  ],
} as Meta<TitlebarComponent>;

const Template: Story<TitlebarComponent> = (args: TitlebarComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
