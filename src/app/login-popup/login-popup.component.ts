import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ComponentCommunicationService } from '../component-communication.service';

import { REQUEST_BASE_URL } from '../globals';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.css']
})
export class LoginPopupComponent implements OnInit {

  private element: any;

  // Login Variables
  username: any = "";
  password: any = ""; // will be used with join area as well

  loginMessage = "";

  // Join Variables
  passwordSeen = "password"; // set to 'password' if toggled hide password, set to 'text' if password shown.
  passwordSeenIcon = "fa-eye";
    // Form Variables Join Area
    firstName: string = "";
    lastName: string = "";
    birthDate: string = "";
    gender: string = "Gender"; // Male, Female, Transgender
    email: string = ""; // will be used in forget password and join form

  // Component Variable
  currentForm = "login"; // can be 'login', 'join', 'forgotPassword'

  constructor(private elementRef: ElementRef, private http: HttpClient, private componentCommunicationService: ComponentCommunicationService) {
    this.element = this.elementRef.nativeElement;
    document.body.appendChild(this.element);
  }

  ngOnInit() {
    document.getElementById("login-popup-component-modal").style.height = 440 + "px"
  }

  closeThisPopup() {
    this.element.remove();
  }

  //  Handle Login form submit
  handleFormSubmit() {
    // validation
    if(!this.validated('login')) {
      return;
    }
    else {
      let currentCoordinates: any = JSON.parse(localStorage.getItem("currentCoordinates"));
      let dataToSend = {
        "username":this.username,
        "password":this.password,
        "latitude":currentCoordinates.latitude,
        "longitude":currentCoordinates.longitude,
        "locality":currentCoordinates.locality,
        "city":currentCoordinates.city,
        "state":currentCoordinates.state,
        "country":currentCoordinates.country
      }

      this.http.post( REQUEST_BASE_URL + "auth/login", dataToSend).subscribe((response: any) => {
        if(response.error == 0) {
          localStorage.setItem("auth_data", JSON.stringify(response.data));
          this.componentCommunicationService.editLoggedInStatus(true);
          this.loginMessage = "Login Successful";
        }
        else {
          this.loginMessage = "Invalid Login";
        }
        location.reload();
      });
    }
  }

  // handle join form submit
  handleJoinFormSubmit() {

    if(!this.validated('join')) {
      return;
    }
    else {
      let currentCoordinates: any = JSON.parse(localStorage.getItem("currentCoordinates"));
      let dataToSend = {
        "email":this.email,
        "firstName": this.firstName,
        "birthDate": this.birthDate,
        "gender": this.gender,
        "lastName": this.lastName,
        "confirmPassword": this.password,
        "password":this.password,
        "latitude":currentCoordinates.latitude,
        "longitude":currentCoordinates.longitude,
        "locality":currentCoordinates.locality,
        "city":currentCoordinates.city,
        "state":currentCoordinates.state,
        "country":currentCoordinates.country
      }

      this.http.post(REQUEST_BASE_URL + "auth/signup", dataToSend).subscribe((response: any) => {
        if(response.error == 0) {
          this.loginMessage = "Registration Succesful. Please check your email for verification. Thank you.";
        }
        if(response.error == 1) {
          this.loginMessage = "There is some problem. Please try again later.";
        }
      });
    }
  }

  // Handle forget password submit
  handleForgetPasswordFormSubmit() {
    let dataToSend = {
      "email":this.email
    }

    this.http.post(REQUEST_BASE_URL + "auth/recover", dataToSend).subscribe((response: any) => {
      if(response.error == 0) {
        this.loginMessage = "We've sent a password reset link to your entered email.";
      }
      if(response.error == 1) {
        this.loginMessage = "There is some problem. Please try again later.";
      }
    });

  }

  changeForm(form: string) {
    let height: number = 0;
    switch(form) {
      case "login": height = 440;
      break;
      case "join": height = 510;
      break;
      case "forgotPassword" : height = 410;
    }

    this.loginMessage = "";
    this.username = "";
    this.password = "";
    this.firstName = "";
    this.lastName = "";
    this.birthDate = "";
    this.gender = "Gender";
    this.email = "";

    document.getElementById("login-popup-component-modal").style.height = height + "px"
    this.currentForm = form;
  }

  togglePasswordVisibility() {
    if(this.passwordSeen == "text") {
      this.passwordSeen = "password";
      this.passwordSeenIcon = "fa-eye";
    }
    else {
      this.passwordSeen = "text";
      this.passwordSeenIcon = "fa-eye-slash";
    }
  }

  // Validate Forms
  validated(form: string) {
    let validationResult: boolean = true;
    switch(form) {
      case "login":
        let usernameElement = <HTMLElement>document.querySelector('input[name="username"]');
        let passwordElement = <HTMLElement>document.querySelector('input[name="password"]');
        // Username
        if(this.username == "") {
          usernameElement.style.borderBottom = "2px solid red";
          validationResult = false;
        }
        else {
          usernameElement.style.borderBottom = "1px solid #ffffff";
        }

        // Password
        if(this.password == "") {
          passwordElement.style.borderBottom = "2px solid red";
          validationResult = false;
        }
        else {
          passwordElement.style.borderBottom = "1px solid #ffffff";
        }
      break;

      case "join":
        let firstnameElement = <HTMLElement>document.querySelector('input[name="first_name"]');
        let lastnameElement = <HTMLElement>document.querySelector('input[name="last_name"]');
        let birthDateElement = <HTMLElement>document.querySelector('input[name="birth_date"]');
        let genderElement = <HTMLElement>document.querySelector('input[name="gender"]');
        let emailElement = <HTMLElement>document.querySelector('input[name="email"]');
        passwordElement = <HTMLElement>document.querySelector('input[name="password"]');

        // First Name
        if(this.firstName == "") {
          firstnameElement.style.borderBottom = "2px solid red";
          validationResult = false;
        }
        else {
          firstnameElement.style.borderBottom = "1px solid #ffffff";
        }

        // Last Name
        if(this.lastName == "") {
          lastnameElement.style.borderBottom = "2px solid red";
          validationResult = false;
        }
        else {
          lastnameElement.style.borderBottom = "1px solid #ffffff";
        }

        // Birth Date
        if(this.birthDate == "") {
          birthDateElement.style.borderBottom = "2px solid red";
          validationResult = false;
        }
        else {
          birthDateElement.style.borderBottom = "1px solid #ffffff";
        }

        // Gender
        if(this.gender == "" || this.gender == "Gender") {
          genderElement.style.borderBottom = "2px solid red";
          validationResult = false;
        }
        else {
          genderElement.style.borderBottom = "1px solid #ffffff";
        }

        // Email
        if(this.email == "") {
          emailElement.style.borderBottom = "2px solid red";
          validationResult = false;
        }
        else {
          emailElement.style.borderBottom = "1px solid #ffffff";
        }

        // Password
        if(this.password == "" || this.password.length < 6) {
          passwordElement.style.borderBottom = "2px solid red";
          validationResult = false;
        }
        else {
          passwordElement.style.borderBottom = "1px solid #ffffff";
        }
      break;
    }

    return validationResult;
  }

}
