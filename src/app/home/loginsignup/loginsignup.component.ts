import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';


import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  loginemail: FormControl;
  loginpassword: FormControl;

  firstName: FormControl;
  lastName: FormControl;
  signUpEmail: FormControl;
  signUpPassword: FormControl;
  signUpConPassword: FormControl;

  constructor(public activeModal: NgbActiveModal, public config: NgbTabsetConfig) {
    config.justify = 'center';
  }

  ngOnInit() {
    this.createFormControl();
    this.createFormGroup();
  }

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
  }

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
  }

  login(){
    console.log( this.loginemail.value );
    console.log( this.loginpassword.value );
  }
}
