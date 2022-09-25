import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { AuthComponent } from './auth.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

export default {
  title: 'AuthComponent',
  component: AuthComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([
          {
            path: '**',
            component: AuthComponent,
          },
        ]),
        ReactiveFormsModule,
      ],
    }),
  ],
} as Meta<AuthComponent>;

const Template: Story<AuthComponent> = (args: AuthComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
