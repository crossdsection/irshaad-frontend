import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LocationTabComponent } from './location-tab/location-tab.component';

// Importing Services
import { ComponentCommunicationService } from './component-communication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  locationTabComponent = LocationTabComponent;

  constructor(private http: HttpClient, private componentCommunicationService: ComponentCommunicationService) { }

  // For AGM Test
  lat: number = 51.678418;
  lng: number = 7.809007;

  ngOnInit() {
    // Getting current location of the user
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        console.log('https://maps.googleapis.com/maps/api/geocode/xml?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyAGvUJIs_SRj6bKpbQvNOWHxDjwnSqlvdE');

        this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyAGvUJIs_SRj6bKpbQvNOWHxDjwnSqlvdE').subscribe((data: any) => {
          console.log(data);
          let country = data.results[6].address_components[0].long_name;
          let countryShortName = data.results[6].address_components[0].short_name;
          let state = data.results[5].address_components[0].long_name;
          let city = data.results[4].address_components[0].long_name;
          let locality = data.results[1].address_components[0].long_name;
          let rwa = '';

          // Storing in localstorage
          var currentCoordinates = {
            'latitude' : position.coords.latitude,
            'longitude' : position.coords.longitude,
            'timestamp' : position.timestamp,
            'rwa' : rwa,
            'locality' : locality,
            'city' : city,
            'state' : state,
            'country' : country,
            'countryShortName': countryShortName
          };
          localStorage.setItem('currentCoordinates', JSON.stringify( currentCoordinates ) );

          // Changing the attributes of location tab component.
          this.componentCommunicationService.editLocationTabComponent(currentCoordinates);
        });
      });
    }
  }
}
