import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Import services
import { GeolocationService } from '../services/geolocation.service';
import { ComponentCommunicationService } from '../component-communication.service';
import { REQUEST_BASE_URL } from '../globals';
import * as $ from 'jquery';
 
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
  @Input() isHome:string;
  homeIconColor = "grey";

  private element: any;

  constructor(private http: HttpClient, 
    private geolocationService: GeolocationService, 
    private componentCommunicationService: ComponentCommunicationService,
    private elementRef: ElementRef) {
      this.element = this.elementRef.nativeElement;
   }

  ngOnInit() {
    console.log(this.isHome);
    if(this.isHome == "true") {
      this.homeIconColor = "blue";
    }
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

      // Change Map Longitude and Latitude
      this.componentCommunicationService.editChangeLocationComponentMapLatLng(this.latitude, this.longitude);
    });
  }

  removeFavLocation() {
    let dataToSend = {
      "latitude": this.latitude,
      "longitude": this.longitude,
      "level": this.level
    };

    this.http.post(REQUEST_BASE_URL + "favlocation/remove", dataToSend).subscribe((response: any) => {
      console.log(response);
      if(response.error == 0) {
        $(this.element).remove();
      }
      else {
        alert("There is some problem in removing this location. Please try again later.");
      }
    },
    (error: any) => {
      console.error(error);
      alert("There is some problem in removing this location. Please try again later.");
    });
  }

}
