import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { UtilityService } from '../services/utility.service';
import { BreadCrumb } from '../menu/breadCrumb';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/localStorage.service';
import { DataService } from '../services/data.service';

import { Token } from '../token';

@Component({
  selector: 'login',
  templateUrl: './login.html'
})
export class LoginComponent {
  hide: boolean = true;
  selected: any;
  user = {
    username: '',
    password: '',
    role: ''
  };
  newUser = {
    username: '',
    password: ''
  };
  userRoles: Array<String>;
  wrongCreds: string = undefined;

  constructor(private router: Router,  private auth: AuthService,
    private localStorageService: LocalStorageService, private utilityService: UtilityService,
    private dataService: DataService) { }

  ngOnInit() {
    this.userRoles = ['admin', 'manager', 'employee'];
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

  register(usercreds) {
    this.dataService.postUserEntity('users', usercreds)
      .then((resCustomerData : any) => {

        location.href = "http://localhost:8080/index.html";
        console.log(location)
        location.reload();
      },
      (err) => console.log("users could not be updated :" + err)
      );
  }

}
