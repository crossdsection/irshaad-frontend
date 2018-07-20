import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ComponentCommunicationService } from '../component-communication.service';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.css']
})
export class LoginPopupComponent implements OnInit {

  private element: any;
  
  username: any;
  password: any;

  constructor(private elementRef: ElementRef, private http: HttpClient, private componentCommunicationService: ComponentCommunicationService) {
    this.element = this.elementRef.nativeElement;
    document.body.appendChild(this.element);
  }

  ngOnInit() {
  }

  closeThisPopup() {
    this.element.remove(); 
  }

  submitLoginForm() {
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

    this.http.post("https://backend.worldvoting.org/auth/login", dataToSend).subscribe((response: any) => {
      localStorage.setItem("auth_data", JSON.stringify(response.data));

      this.componentCommunicationService.editLoggedInStatus(true);
    });

  }

  handleFormSubmit() {
    this.submitLoginForm();
    this.closeThisPopup();
  }

}
