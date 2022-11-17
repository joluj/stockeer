import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { TitlebarComponent } from './titlebar.component';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Stockeer } from '@stockeer/store';

export default {
  title: 'TitlebarComponent',
  component: TitlebarComponent,
  decorators: [
    moduleMetadata({
      imports: [IonicModule.forRoot(), RouterTestingModule],
    }),
  ],
} as Meta<TitlebarComponent>;

const Template: Story<TitlebarComponent> = (args: TitlebarComponent) => ({
  props: args,
});

const stockeer1: Stockeer = new Stockeer({
  id: 'test-id-kitchen',
  products: [],
  name: 'Kitchen',
});

const stockeer2: Stockeer = new Stockeer({
  id: 'test-id-wine',
  products: [],
  name: 'Wine Refrigerator',
});

export const NoneSelected = Template.bind({});
NoneSelected.args = {
  stockeers$: of([stockeer1, stockeer2]),
  selection$: of([]),
} as Partial<TitlebarComponent>;

export const OneSelected = Template.bind({});
OneSelected.args = {
  stockeers$: of([stockeer1, stockeer2]),
  selection$: of([stockeer1]),
} as Partial<TitlebarComponent>;

export const TwoSelected = Template.bind({});
TwoSelected.args = {
  stockeers$: of([stockeer1, stockeer2]),
  selection$: of([stockeer1, stockeer2]),
} as Partial<TitlebarComponent>;
