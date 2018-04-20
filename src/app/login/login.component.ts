import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '../services/utility.service';
import { BreadCrumb } from '../menu/breadCrumb';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/localStorage.service';

import { Token } from '../token';

@Component({
  selector: 'login',
  templateUrl: './login.html'
})
export class LoginComponent {
  user = {
    username: '',
    password: ''
  };
  wrongCreds: string = undefined;

  constructor(private router: Router, private route: ActivatedRoute, private auth: AuthService,
              private localStorageService: LocalStorageService, private utilityService: UtilityService) { }

  ngOnInit() {
  }

  login(usercreds) {
    this.auth.login(usercreds)
      .then((data) => {
        this.localStorageService.setAuthorizationData(data);
        this.utilityService.addTokenSubject(data.access_token);
        this.router.navigate(['/home']);
      },
      (err) => {
        this.wrongCreds = "Invalid Credentials"
       }
      );

  }

}
