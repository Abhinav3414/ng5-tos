import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/localStorage.service';

@Component({
  selector: 'home',
  templateUrl: './home.html',
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate('200ms ease-in')
      ])
    ])
  ]
})
export class HomeComponent {
  expression: any;
  constructor(private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    if (this.localStorageService.getValueFromLocalStorage() == null)
      this.router.navigate(['view/login']);
  }

}
