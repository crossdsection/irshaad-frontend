import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { LoginPopupComponent } from '../login-popup/login-popup.component';

import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ComponentCommunicationService } from '../component-communication.service';

import { REQUEST_BASE_URL } from '../globals';

@Component({
  selector: 'app-header-profile-icon',
  templateUrl: './header-profile-icon.component.html',
  styleUrls: ['./header-profile-icon.component.css']
})
export class HeaderProfileIconComponent implements OnInit {

  loggedIn = false;
  profileMenuOpen = false;

  // User Info
  profilePicture = 'assets/img/1.jpg';

  // For loading login popup component
  @ViewChild("loginPopupContainer", {read: ViewContainerRef}) loginPopupContainer;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private http: HttpClient, private componentCommunicationService: ComponentCommunicationService) { }

  ngOnInit() {
    this.componentCommunicationService.headerProfileIconComponentData.subscribe((data: any) => {
      this.loggedIn = data;
      // Getting User Info
      this.http.get(REQUEST_BASE_URL + "user/getinfo").subscribe((response: any) => {
        this.loggedIn = true;
        this.profilePicture = REQUEST_BASE_URL + response.data[0].profilepic;
        }, 
        error => {
        if(error.status) {
          this.loggedIn = false;
        }
      });
    });

    this.http.get(REQUEST_BASE_URL + "user/getinfo").subscribe((response: any) => {
      this.loggedIn = true;
      }, 
      error => {
      if(error.status) {
        this.loggedIn = false;
      }
    });
  }

  // Click Event Handler
  showLoginPopup() {
    this.loginPopupContainer.createComponent(this.componentFactoryResolver.resolveComponentFactory(LoginPopupComponent));
  }

  // To Toggle Profile Menu
  toggleProfileMenu() {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  logoutAction() {
    this.loggedIn = !this.loggedIn;
    this.componentCommunicationService.userLogout();
    this.toggleProfileMenu();
  }

}
