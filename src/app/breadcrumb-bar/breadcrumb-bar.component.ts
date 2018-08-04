import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

import { ComponentCommunicationService } from '../component-communication.service';
import * as $ from 'jquery';
import { REQUEST_BASE_URL } from '../globals';
import { HttpClient } from '@angular/common/http';

import { EnactPopupComponent } from '../enact-popup/enact-popup.component';

@Component({
  selector: 'app-breadcrumb-bar',
  templateUrl: './breadcrumb-bar.component.html',
  styleUrls: ['./breadcrumb-bar.component.css']
})
export class BreadcrumbBarComponent implements OnInit {

  currentLocation: string = "";
  barBackgroundColor: string = "#1e4372";
  govtDeptToggled = false;
  sidebarWidth = "25vw";
  sideMenuToggled = false;
  favLocationIconColor = "white";

  // For Enact Popup
  @ViewChild("enactPopupContainer", { read: ViewContainerRef}) enactPopupContainer;

  constructor(private componentCommunicationService: ComponentCommunicationService, private http: HttpClient, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.componentCommunicationService.breadcrumbBarComponentData.subscribe((data: string) => {
      if(data == "true") {
        let locationContext: any = JSON.parse(localStorage.getItem("locationContext"));
        let currentCoordinates: any = JSON.parse(localStorage.getItem("currentCoordinates"));
        switch(locationContext.type) {
          case "locality": 
            this.currentLocation = currentCoordinates.locality + ", " + currentCoordinates.city + ", " + currentCoordinates.state + ", " + currentCoordinates.country;
            this.barBackgroundColor = "#b5375f";
          break;
          case "city": 
            this.currentLocation = currentCoordinates.city + ", " + currentCoordinates.state + ", " + currentCoordinates.country;
            this.barBackgroundColor = "#8e5220";
          break;
          case "state": 
            this.currentLocation = currentCoordinates.state + ", " + currentCoordinates.country;
            this.barBackgroundColor = "#4d99be";
          break;
          case "country": 
            this.currentLocation = currentCoordinates.country;
            this.barBackgroundColor = "#dd7518";
          break;
          case "world": 
            this.currentLocation = "World";
            this.barBackgroundColor = "#71911d";
          break;
        }

        this.http.get(REQUEST_BASE_URL + "favlocation/exist?latitude=" + currentCoordinates.latitude + "&longitude=" + currentCoordinates.longitude + "&level=" + locationContext.type).subscribe((response: any) => {
          if(response.data.exist == true) {
            this.favLocationIconColor = "yellow";
          }
          else {
            this.favLocationIconColor = "white";
          }
        });
      }
    });
  }

  toggleGovtDept() {
    this.govtDeptToggled = !this.govtDeptToggled;
  }

  closeSideMenu() {
    this.sideMenuToggled = false;
    this.sidebarWidth = "0";
  }

  openSideMenu() {
    this.sideMenuToggled = true;
    this.sidebarWidth = "25vw";
  }

  addContextFavLoction() {
    let locationContext = JSON.parse(localStorage.getItem("locationContext"));
    let currentCoordinates = JSON.parse(localStorage.getItem("currentCoordinates"));

    currentCoordinates.latitude = "" + currentCoordinates.latitude;
    currentCoordinates.longitude = "" + currentCoordinates.longitude;
    currentCoordinates.level = locationContext.type;

    this.http.post(REQUEST_BASE_URL + 'favlocation/submit', currentCoordinates).subscribe(
      (res: any) => {
        if(res.error == 0) {
          this.favLocationIconColor = "yellow";
          this.componentCommunicationService.editFavLocationListGridComponentDisplay();
        }
      },
      err => {
        // Handle Error
      }
    );
  }

  showEnactPopup() {
    this.enactPopupContainer.createComponent(this.componentFactoryResolver.resolveComponentFactory(EnactPopupComponent));
  }
}
