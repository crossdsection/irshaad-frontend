import { Component, ElementRef, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Importing Services
import { ComponentCommunicationService } from './component-communication.service';
import { GeolocationService } from './services/geolocation.service';

// import * as $ from 'jquery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  @ViewChild('headerDiv' , { read: ElementRef }) headerDiv: ElementRef;

  constructor(private http: HttpClient, private componentCommunicationService: ComponentCommunicationService, private geolocationService: GeolocationService) { }

  // For AGM Test
  lat: number = 0;
  lng: number = 0;

  ngOnInit() {
    let currentCoordinates: any = localStorage.getItem("currentCoordinates");

    if(currentCoordinates == null || currentCoordinates == "") {
      this.getUserCurrentLocation();
    }
    else {
      currentCoordinates = JSON.parse(currentCoordinates);
      this.lat = parseFloat(currentCoordinates.latitude);
      this.lng = parseFloat(currentCoordinates.longitude);
      // Changing the attributes of location tab component.
      // this.componentCommunicationService.editLocationTabComponent(currentCoordinates);
      this.componentCommunicationService.editBreadcrumbBarLocationContext();
    }

    this.componentCommunicationService.currentLocationData.subscribe((flag: string = "false") => {
      if(flag == "true") {
        this.getUserCurrentLocation();
      }
    });

  }

  getUserCurrentLocation() {
    // Getting current location of the user
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyAGvUJIs_SRj6bKpbQvNOWHxDjwnSqlvdE').subscribe((data: any) => {

          let resolvedLocation: any = this.geolocationService.resolveLocation(data.results[0]);

          // Storing in localstorage
          var currentCoordinates = {
            'latitude' : position.coords.latitude,
            'longitude' : position.coords.longitude,
            'timestamp' : position.timestamp,
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
          // this.componentCommunicationService.editLocationTabComponent(currentCoordinates);
          this.componentCommunicationService.editChangeLocationComponentMapLatLng(currentCoordinates.latitude, currentCoordinates.longitude);

          // Changing Breadcrumb Bar Location Context
          this.componentCommunicationService.editBreadcrumbBarLocationContext();

          location.reload();
        });
      });
    }
  }

  ngAfterViewInit() {
    console.log(this.headerDiv.nativeElement.offsetHeight);
  }

}
