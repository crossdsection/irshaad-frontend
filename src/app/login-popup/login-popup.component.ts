import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ComponentCommunicationService } from '../component-communication.service';

import { REQUEST_BASE_URL } from '../globals';
import { GeolocationService } from '../services/geolocation.service';

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

    // Form Variables Verification
    reset: string = "";
    newPassword: string = "";

  // Component Variable
  currentForm = "login"; // can be 'login', 'join', 'forgotPassword', 'resetCode', 'newPassword'

  constructor(private elementRef: ElementRef, private http: HttpClient, private componentCommunicationService: ComponentCommunicationService, private geolocationService: GeolocationService) {
    this.element = this.elementRef.nativeElement;
    document.body.appendChild(this.element);
  }

  ngOnInit() {
    document.getElementById("login-popup-component-modal").style.height = 440 + "px";
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

          // Changing Current location to favorite home location.
          // Set User's home location if user is logged in.
          this.http.get(REQUEST_BASE_URL + 'favlocation/get?isHome=1').subscribe((response: any) => {
            let lat: number = parseFloat(response.data[0].longitude);
            let lng: number = parseFloat(response.data[0].latitude);

            console.log("home lat lng");
            console.log(lat);
            console.log(lng);
            this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lng + ',' + lat + '&key=AIzaSyAGvUJIs_SRj6bKpbQvNOWHxDjwnSqlvdE').subscribe((data: any) => {
              console.log(data.results[0]);
              let resolvedLocation: any = this.geolocationService.resolveLocation(data.results[0]);
              console.log(resolvedLocation);

              // Storing in localstorage
              var currentCoordinates = {
                'latitude' : lat,
                'longitude' : lng,
                'timestamp' : "",
                'rwa' : "",
                'locality' : resolvedLocation.locality,
                'city' : resolvedLocation.city,
                'state' : resolvedLocation.state,
                'country' : resolvedLocation.country,
                'countryShortName': resolvedLocation.countryShortName
              };
              localStorage.setItem('currentCoordinates', JSON.stringify( currentCoordinates ) );
              localStorage.setItem('locationContext', JSON.stringify( {type: "locality"} ) );

              // Changing the attributes of location tab component.
              this.componentCommunicationService.editLocationTabComponent(currentCoordinates);
              this.componentCommunicationService.editChangeLocationComponentMapLatLng(currentCoordinates.latitude, currentCoordinates.longitude);

              // Changing Breadcrumb Bar Location Context
              this.componentCommunicationService.editBreadcrumbBarLocationContext();

              location.reload();
            });

          });
        } else {
          this.loginMessage = "Invalid Login";
        }
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
        } else {
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
        this.loginMessage = response.message;
        this.changeForm('resetCode');
      } else {
        this.loginMessage = response.message;
      }
    });

  }

  // Handle Email Verification submit
  handleVerify() {
    let dataToSend = {
      "email": this.email,
      "code" : this.reset
    }
    this.http.post( REQUEST_BASE_URL + "user/verify", dataToSend ).subscribe((response: any) => {
      if( response.error == 0 ) {
        localStorage.setItem( "auth_data", JSON.stringify( response.data ) );
        this.loginMessage = response.message;
        this.changeForm('newPassword');
      }
      if( response.error == 1 ) {
        this.loginMessage = "Please try again later.";
      }
    });
  }

  handleChangePassword() {
    let dataToSend = {
      "password" : this.newPassword
    }
    this.http.post( REQUEST_BASE_URL + "user/update", dataToSend ).subscribe((response: any) => {
      if( response.error == 0 ) {
        this.loginMessage = response.message;
        location.reload();
      }
      if( response.error == 1 ) {
        this.loginMessage = "Please try again later.";
      }
    });
  }

  changeForm(form: string) {
    let height: number = 0;
    switch( form ) {
      case "login":
        height = 440;
        break;
      case "join":
        height = 510;
        break;
      case "forgotPassword" :
        height = 410;
        break;
      case "resetCode" :
        height = 410;
        break;
      case "newPassword" :
        height = 410;
        break;
    }

    this.loginMessage = "";
    this.username = "";
    this.password = "";
    this.firstName = "";
    this.lastName = "";
    this.birthDate = "";
    this.gender = "Gender";
    // this.email = "";

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
