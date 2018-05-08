import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../services/localStorage.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'content',
  templateUrl: './content.html',
})
export class ContentComponent {
  items: any[];
  title = 'Team Operations System';
  tokenSub = undefined;

  constructor(private router: Router, private route: ActivatedRoute, private localStorageService: LocalStorageService,
    private utilityService: UtilityService) { }

  ngOnInit() {
    this.utilityService.currenttokenSubject.subscribe(tokenSubject => {
      this.tokenSub = tokenSubject;
    })
    var local = this.localStorageService.getValueFromLocalStorage()
    if (local !== null)
      this.tokenSub = local.access_token;

  }
}
