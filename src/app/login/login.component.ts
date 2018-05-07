import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { UtilityService } from '../services/utility.service';
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

  constructor(private router: Router,  private authService: AuthService,
    private localStorageService: LocalStorageService, private utilityService: UtilityService,
    private dataService: DataService) { }

  ngOnInit() {
    this.userRoles = ['admin', 'manager', 'employee'];
  }

  login(usercreds) {
    this.authService.login(usercreds)
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
        console.log("abhinab")
          console.log(this.dataService.PropUris)
        if(location.origin === 'http://localhost:4200') {
          location.href = location.origin;
        }
        else {
          let PropertyUris = JSON.parse(localStorage.getItem("PropertyUris"));
          console.log("Popr" + PropertyUris);
          console.log(this.dataService.PropUris)
          if(PropertyUris !== null) {
                location.href = PropertyUris.appBaseUrl;
          }
        }

      },
      (err) => console.log("users could not be updated :" + err)
      );
  }

}
