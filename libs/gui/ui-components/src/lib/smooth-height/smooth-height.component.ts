import {
  HostBinding,
  Component,
  ElementRef,
  Input,
  OnChanges,
} from '@angular/core';

import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'stockeer-smooth-height',
  templateUrl: 'smooth-height.component.html',
  styles: [
    `
      :host {
        display: block;
        overflow: hidden;
      }
    `,
  ],
  animations: [
    trigger('grow', [
      transition('void <=> *', []),
      transition('* <=> *', [
        style({ height: '{{startHeight}}px', opacity: 0 }),
        animate('{{duration}} ease'),
      ]),
    ]),
  ],
})
export class SmoothHeightComponent implements OnChanges {
  @Input()
  trigger: unknown = undefined;

  @Input()
  duration?: string | undefined;

  startHeight = 0;

  constructor(private element: ElementRef) {}

  @HostBinding('@grow') get grow() {
    return {
      value: this.trigger,
      params: {
        startHeight: this.startHeight,
        duration: this.duration ?? '0.33s',
      },
    };
  }

  setStartHeight() {
    this.startHeight = this.element.nativeElement.clientHeight;
  }

  ngOnChanges() {
    this.setStartHeight();
  }
}
