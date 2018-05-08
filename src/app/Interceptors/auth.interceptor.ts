import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from '../services/localStorage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token: string;

  constructor(private localStorageService: LocalStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //  this.token = '?access_token=' + this.localStorageService.getValueFromLocalStorage().access_token;
    //  req.url = req.url + this.token;
    const authreq = req.clone();
    return next.handle(authreq);
  }

}
