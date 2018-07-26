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
  lat: number = 0;
  lng: number = 0;

  // Component Variables
  optionSelected: string = "listFavLocation"; // can be 'listFavLocation'

  // Search key
  @ViewChild("searchKeyword")
  public searchElementRef: ElementRef;

  // Enter Location References searchStateKeyword
  restrictedSearchArea: string = "";
  private searchCountryElementRef: ElementRef;
  stateAutocomplete: any;
  cityAutocomplete: any;
  @ViewChild('searchCountryKeyword') set content(content: ElementRef) {
      this.searchCountryElementRef = content;

      // Setting up auto complete
      let autocomplete = new google.maps.places.Autocomplete(this.searchCountryElementRef.nativeElement, {
        types: ["geocode"]
      });
      autocomplete.addListener('place_changed', () => {
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        let currentCoordinates = this.geolocationService.resolveLocation(place);

        this.restrictedSearchArea = currentCoordinates.countryShortCode;

        console.log(this.restrictedSearchArea);

        this.stateAutocomplete.setComponentRestrictions(
          {'country': ["IN"]});
      });
  }

  private searchStateElementRef: ElementRef;
  @ViewChild('searchStateKeyword') set stateContent(content: ElementRef) {
      this.searchStateElementRef = content;

      // Setting up auto complete
      this.stateAutocomplete = new google.maps.places.Autocomplete(this.searchStateElementRef.nativeElement, {
        types: ["geocode"],
        
      });
        this.stateAutocomplete.addListener('place_changed', () => {
          let place: google.maps.places.PlaceResult = this.stateAutocomplete.getPlace();
          let currentCoordinates = this.geolocationService.resolveLocation(place);
          this.restrictedSearchArea = currentCoordinates.countryShortCode;
          this.cityAutocomplete.setComponentRestrictions(
            {'country': ["IN"]});
      });
  }

  private searchCityElementRef: ElementRef;
  @ViewChild('searchCityKeyword') set cityContent(content: ElementRef) {
      this.searchCityElementRef = content;

      // Setting up auto complete
      this.cityAutocomplete = new google.maps.places.Autocomplete(this.searchCityElementRef.nativeElement, {
        types: ["(cities)"],
        
      });
        this.cityAutocomplete.addListener('place_changed', () => {
        let place: google.maps.places.PlaceResult = this.cityAutocomplete.getPlace();
        let currentCoordinates = this.geolocationService.resolveLocation(place);

        this.restrictedSearchArea = currentCoordinates.countryShortCode;

        console.log(this.restrictedSearchArea);

        this.stateAutocomplete.setComponentRestrictions(
          {'country': ["IN"]});
      });
  }


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
    this.lat = parseFloat( currentCoordinates.latitude );
    this.lng = parseFloat( currentCoordinates.longitude );
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
        console.log("current Coordinates");
        console.log(currentCoordinates);
        console.log(JSON.stringify(currentCoordinates));
        localStorage.setItem("currentSearchedLocation", JSON.stringify(currentCoordinates));
        localStorage.setItem("currentCoordinates", JSON.stringify(currentCoordinates));

        // verify result
        if(place.geometry === undefined || place.geometry === null) {
          return;
        }
        // set latitude, longitude and zoom
        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();

        // Changing the attributes of location tab component.
        this.componentCommunicationService.editLocationTabComponent(currentCoordinates);
      });
    });

    // Listen to componentCommunicationService object for toggle location.
    this.componentCommunicationService.changeLocationComponentData.subscribe((parameters: any) => {
      if(parameters == "") {
        this.elementDisplay = (this.elementDisplay == "none") ? "block" : "none";
        this.element.style.display = this.elementDisplay;
      }
      else {
        parameters = JSON.parse(parameters);
        if(parameters.action == "setLatLng") {
          this.lat = parseFloat(parameters.latitude);
          this.lng = parseFloat(parameters.longitude);
        }
      }
    });

    // Doing nativeElement Stuff
    // Initial element stuff
    this.element.style.display = this.elementDisplay;
    $(".app-change-location-fav-location-icon").css("color", "#ff5722");
    
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
        this.componentCommunicationService.editFavLocationListGridComponentDisplay();
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
        $(".app-change-location-fav-location-icon").css("color", "#ff5722");
       }
      break;

      case "enterLocation":
       console.log(this.searchCountryElementRef);
       this.optionSelected = (this.optionSelected == "") ? section : "";
       if(this.optionSelected == "") {
        $(".app-change-location-enter-location-icon").css("color", "#000000");
       }
       else {
        $(".app-change-location-enter-location-icon").css("color", "#ff0000");
       }
      break;
    }
  }

  searchLocation() {
    // Nothing to be done
  }

} // End Class
