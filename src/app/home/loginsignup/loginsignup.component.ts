import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';

import { HttpService } from '../../services/http.service';
import { UserdataService } from '../../services/userdata.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Coordinates } from '../../interfaces/coordinates';

@Component({
  selector: 'app-loginsignup',
  templateUrl: './loginsignup.component.html',
  styleUrls: ['./loginsignup.component.css'],
  providers: [NgbTabsetConfig]
})

export class LoginsignupComponent implements OnInit {

  loginform: FormGroup;
  signupform: FormGroup;
  closeResult: string;
  loginAlert: Number;
  signupAlert: Number;

  loginemail: FormControl;
  loginpassword: FormControl;

  firstName: FormControl;
  lastName: FormControl;
  signUpEmail: FormControl;
  signUpPassword: FormControl;
  signUpConPassword: FormControl;

  currentCoordinates: Coordinates;

  constructor( public activeModal: NgbActiveModal, public config: NgbTabsetConfig, private httpService: HttpService, private userService: UserdataService ) {
    config.justify = 'center';
    this.signupAlert = 0;
    this.loginAlert = 0;
  };

  ngOnInit() {
    this.createFormControl();
    this.createFormGroup();
    var location = localStorage.getItem('currentCoordinates');
    if( location == null ){
      this.currentCoordinates = {
        'latitude' : 0,
        'longitude' : 0,
        'locality' : null,
        'city' : null,
        'state' : null,
        'country' : null,
        'timestamp' : 0
      };
    } else {
      this.currentCoordinates = JSON.parse( location );
    }
  };

  createFormGroup(){
    this.loginform = new FormGroup({
      loginemail : this.loginemail,
      loginpassword : this.loginpassword
    });

    this.signupform = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      signUpEmail: this.signUpEmail,
      signUpPassword: this.signUpPassword,
      signUpConPassword: this.signUpConPassword
    });
  };

  createFormControl(){
    this.loginemail = new FormControl('', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.loginpassword = new FormControl('', [
      Validators.minLength(8),
      Validators.required
    ]);
    this.firstName = new FormControl('', [
        Validators.required
    ]);
    this.lastName = new FormControl('', [
        Validators.required
    ]);
    this.signUpEmail = new FormControl('', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
    ]);
    this.signUpPassword = new FormControl('', [
      Validators.minLength(8),
      Validators.required
    ]);
    this.signUpConPassword = new FormControl('', [
      Validators.minLength(8),
      Validators.required
    ]);
  };

  login(){
    var postData = {};
    postData['username'] = this.loginemail.value;
    postData['password'] = this.loginpassword.value;
    postData['latitude'] = this.currentCoordinates.latitude;
    postData['longitude'] = this.currentCoordinates.longitude;
    postData['locality'] = this.currentCoordinates.locality;
    postData['city'] = this.currentCoordinates.city;
    postData['state'] = this.currentCoordinates.state;
    postData['country'] = this.currentCoordinates.country;
    this.httpService.doPOST( '/auth/login', postData ).subscribe(
      response => {
        console.log( response );
        if( response["error"] == 0 ){
          this.loginAlert = 1;
          localStorage.setItem( 'userData', JSON.stringify( response['data'] ) );
          this.userService.getUserInfo();
          this.activeModal.close( 'Close Click' );
          location.reload();
        } else {
          this.loginAlert = -1;
        }
      },
      err => console.log(err)
    );
  };

  signup(){
    var postData = {};
    postData['email'] = this.signUpEmail.value;
    postData['firstName'] = this.firstName.value;
    postData['lastName'] = this.lastName.value;
    postData['password'] = this.signUpPassword.value;
    postData['confirmPassword'] = this.signUpConPassword.value;
    postData['latitude'] = this.currentCoordinates.latitude;
    postData['longitude'] = this.currentCoordinates.longitude;
    postData['locality'] = this.currentCoordinates.locality;
    postData['city'] = this.currentCoordinates.city;
    postData['state'] = this.currentCoordinates.state;
    postData['country'] = this.currentCoordinates.country;
    this.httpService.doPOST( '/auth/signup', postData ).subscribe(
      response => {
        if( response["error"] == 0 ){
          this.signupAlert = 1;
        } else {
          this.signupAlert = -1;
        }
      },
      err => console.log(err)
    );
  };
}
