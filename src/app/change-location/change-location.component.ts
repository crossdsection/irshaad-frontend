import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { GOOGLE_MAPS_API_KEY, REQUEST_BASE_URL } from '../globals';

import { MapsAPILoader } from '@agm/core';

import {  } from 'googlemaps';

import { GeolocationService } from '../services/geolocation.service';
import { ComponentCommunicationService } from '../component-communication.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-change-location',
  templateUrl: './change-location.component.html',
  styleUrls: ['./change-location.component.css']
})

export class ChangeLocationComponent implements OnInit {

  private element: any;
  elementDisplay = "block";

  // For AGM Test
  lat: number = 51.678418;
  lng: number = 7.809007;

  // Component Variables
  optionSelected: string = ""; // can be 'listFavLocation'

  // Search key
  @ViewChild("searchKeyword")
  public searchElementRef: ElementRef;

  @ViewChild("toBeMoved")
  public toBeMovedRef: ElementRef;
  public currentMargin = 0;

  constructor(private elementRef: ElementRef, 
              private http: HttpClient, 
              private mapsAPILoader: MapsAPILoader, 
              private geolocationService: GeolocationService,
              private componentCommunicationService: ComponentCommunicationService) {
   let currentCoordinates = JSON.parse(localStorage.getItem("currentCoordinates"));

   if(currentCoordinates != null) {
    this.lat = currentCoordinates.latitude;
    this.lng = currentCoordinates.longitude;
   }

    this.element = this.elementRef.nativeElement;
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

    // Listen to componentCommunicationService object for toggle location.
    this.componentCommunicationService.changeLocationComponentData.subscribe((waste) => {
      this.elementDisplay = (this.elementDisplay == "none") ? "block" : "none";
      this.element.style.display = this.elementDisplay;
    });

    // Doing nativeElement Stuff
    // Initial element stuff
    this.element.style.display = this.elementDisplay;
  }

  onMouseOver(infoWindow, gm) {
    if( gm.lastOpen != null ) {
        gm.lastOpen.close();
    }
    gm.lastOpen = infoWindow;
    infoWindow.open();
  }

  saveFavouriteLocation(){
    var favCoordinates = JSON.parse(localStorage.getItem("currentSearchedLocation"));
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

  toggleSection(section: string) {
    switch(section) {
      case "listFavLocation":
       this.optionSelected = (this.optionSelected == "") ? section : "";
       if(this.optionSelected == "") {
        $(".app-change-location-fav-location-icon").css("color", "#000000");
       }
       else {
        $(".app-change-location-fav-location-icon").css("color", "green");
       }
      break;
    }
  }

} // End Class
