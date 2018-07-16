import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

class UserLocation {

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private http: HttpClient) { }

  // For AGM Test
  lat: number = 51.678418;
  lng: number = 7.809007;

  ngOnInit() {
    // Getting current location of the user
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);

        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyAGvUJIs_SRj6bKpbQvNOWHxDjwnSqlvdE').subscribe((data) => {
          console.log(data);
        });
      });
    }
  }
}
