import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LocationTabComponent } from './location-tab/location-tab.component';

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

  locationTabComponent = LocationTabComponent;

  constructor(private http: HttpClient, private componentCommunicationService: ComponentCommunicationService, private geolocationService: GeolocationService) { }

  // For AGM Test
  lat: number = 51.678418;
  lng: number = 7.809007;

  ngOnInit() {
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

          // Changing the attributes of location tab component.
          this.componentCommunicationService.editLocationTabComponent(currentCoordinates);
        });
      });
    }
  }
}
