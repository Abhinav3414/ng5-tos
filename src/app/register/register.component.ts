import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { UtilityService } from '../services/utility.service';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/localStorage.service';
import { DataService } from '../services/data.service';
import { UrlService } from '../services/url.service';

import { Token } from '../token';

@Component({
  selector: 'register',
  templateUrl: './register.html'
})
export class RegisterComponent {
  hide: boolean = true;

  newUser = {
    username: '',
    password: ''
  };

  userRoles: Array<String>;
  wrongCreds: string = undefined;

  constructor(private router: Router, private authService: AuthService,
    private localStorageService: LocalStorageService, private utilityService: UtilityService,
    private dataService: DataService, private urlService: UrlService) { }

  ngOnInit() {
    this.userRoles = ['admin', 'manager', 'employee'];
  }

  register(usercreds) {
    this.dataService.postUserEntity('users', usercreds)
      .then((resCustomerData: any) => {
        location.href = (location.origin === 'http://localhost:4200') ? location.origin : this.urlService.getAppBaseUrl();
      },
      (err) => console.log("users could not be updated :" + err)
      );
  }

}
