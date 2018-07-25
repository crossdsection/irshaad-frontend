import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Import services
import { GeolocationService } from '../services/geolocation.service';
import { ComponentCommunicationService } from '../component-communication.service';
 
@Component({
  selector: 'app-fav-location-tile',
  templateUrl: './fav-location-tile.component.html',
  styleUrls: ['./fav-location-tile.component.css']
})
export class FavLocationTileComponent implements OnInit {

  @Input() location: string;
  @Input() longitude: string;
  @Input() latitude: string;
  @Input() level: string;

  constructor(private http: HttpClient, private geolocationService: GeolocationService, private componentCommunicationService: ComponentCommunicationService) {
   }

  ngOnInit() {
  }

  setFavLocation() {
    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.latitude + ',' + this.longitude + '&key=AIzaSyAGvUJIs_SRj6bKpbQvNOWHxDjwnSqlvdE').subscribe((data: any) => {
      let resolvedLocation: any = this.geolocationService.resolveLocation(data.results[0]);

      // Storing in localstorage
      var currentCoordinates = {
        'latitude' : parseFloat( this.latitude ),
        'longitude' : parseFloat( this.longitude ),
        'timestamp' : 0,
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
  }

}
