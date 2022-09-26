import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [style({ opacity: 0 }), animate(333)]),
  transition(':leave', [animate(333, style({ opacity: 0 }))]),
]);
