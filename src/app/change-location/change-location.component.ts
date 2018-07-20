import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { GOOGLE_MAPS_API_KEY, REQUEST_BASE_URL } from '../globals';

import { MapsAPILoader } from '@agm/core';

import {  } from 'googlemaps';

import { GeolocationService } from '../services/geolocation.service';


@Component({
  selector: 'app-change-location',
  templateUrl: './change-location.component.html',
  styleUrls: ['./change-location.component.css']
})

export class ChangeLocationComponent implements OnInit {

  // For AGM Test
  lat: number = 51.678418;
  lng: number = 7.809007;

  // Search key
  @ViewChild("searchKeyword")
  public searchElementRef: ElementRef;

  @ViewChild("toBeMoved")
  public toBeMovedRef: ElementRef;
  public currentMargin = 0;

  constructor(private http: HttpClient, private mapsAPILoader: MapsAPILoader, private geolocationService: GeolocationService) {
   let currentCoordinates = JSON.parse(localStorage.getItem("currentCoordinates"));

    this.lat = currentCoordinates.latitude;
    this.lng = currentCoordinates.longitude;
  }

  ngOnInit() {
    let currentCoordinates = JSON.parse(localStorage.getItem("currentCoordinates"));

    this.lat = currentCoordinates.latitude;
    this.lng = currentCoordinates.longitude;

    // Loading Maps
    this.mapsAPILoader.load().then(() => {
    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener('place_changed', () => {
        // get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        currentCoordinates = this.geolocationService.resolveLocation(place);
        localStorage.setItem("currentSearchedLocation", JSON.stringify(currentCoordinates));

        // verify result
        if(place.geometry === undefined || place.geometry === null) {
          return;
        }

        // set latitude, longitude and zoom
        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();
      })
    });
  }

  /*autocompleteLoction() {
    const httpOptions = {
      headers: new HttpHeaders({
        'access-control-allow-origin': '*',
        'extra': 'grgr'
      })
    };

    this.http.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + this.searchKeyword + "&types=geocode&language=en&key=" + GOOGLE_MAPS_API_KEY, httpOptions).subscribe((response) => {
      console.log(response);
    });
  }*/

  onMouseOver(infoWindow, gm) {
    console.log( gm );
    if( gm.lastOpen != null ) {
        gm.lastOpen.close();
    }
    gm.lastOpen = infoWindow;
    infoWindow.open();
  }

  saveFavouriteLocation(){
    var favCoordinates = JSON.parse(localStorage.getItem("currentSearchedLocation"));
    console.log(favCoordinates);
    this.http.post(REQUEST_BASE_URL + 'favlocation/submit', favCoordinates).subscribe(
      res => {
        console.log( res );
      },
      err => {
        console.log("Error");
        console.log( err )
      }
    );
  }

  moveLeft(toBeMoved) {
    let element = document.getElementById("grid-fav");
    this.currentMargin += 250;
    if(this.currentMargin >= 250) {
      this.currentMargin = 0;
    }
   element.style.marginLeft = this.currentMargin + "px";
  }

  moveRight() {
   let element = document.getElementById("grid-fav");
    this.currentMargin -= 250;
   element.style.marginLeft = this.currentMargin + "px";
  }

} // End Class
