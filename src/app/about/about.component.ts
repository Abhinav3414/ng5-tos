import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'about',
  templateUrl: './about.html',
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate('200ms ease-in')
      ])
    ])
  ]
})
export class AboutComponent {

  constructor() {
  }

}
