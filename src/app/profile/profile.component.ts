import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../services/data.service';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';


@Component({
  selector: 'profile',
  templateUrl: './profile.html'
})
export class ProfileComponent {
  selectedFile = null;
  options: RequestOptions;

  constructor(private http: Http) {
      let headers: any = new Headers();
      headers.append('Content-Type', undefined);
      this.options = new RequestOptions({ headers: headers });
  }

  ngOnInit() {

  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];

    console.log(event);

  }

  onUpload() {

    var storageRef = firebase.storage().ref();
    var mountainsRef = storageRef.child('mountains.jpg');


const fd= new FormData();
fd.append('pic', this.selectedFile, this.selectedFile.name);

    this.http.post('http://localhost:8080/tos/employees/upload', this.selectedFile, this.options
  )
    .subscribe(res => console.log(res));

  }

}
