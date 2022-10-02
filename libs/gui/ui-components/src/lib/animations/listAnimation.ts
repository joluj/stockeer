import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const listAnimation = trigger('listAnimation', [
  transition(
    '* => *',
    [
      query(
        ':enter',
        [
          style({ opacity: 0 }),
          stagger(33, [
            style({ opacity: 0, height: '0px' }),
            animate('250ms', style({ opacity: 1, height: '{{height}}' })),
          ]),
        ],
        {
          optional: true,
        }
      ),
      query(
        ':leave',
        animate(
          333,
          style({
            opacity: 0,
            height: '0px',
          })
        ),
        {
          optional: true,
        }
      ),
    ],
    { params: { height: '3.8rem' } }
  ),
]);
