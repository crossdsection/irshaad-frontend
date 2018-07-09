import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Coordinates } from '../../interfaces/coordinates';
import { } from '@types/googlemaps';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';

import { CarouselComponent } from '../../carousel/carousel.component';

@Component({
  selector: 'app-fav-location',
  templateUrl: './fav-location.component.html',
  styleUrls: ['./fav-location.component.css']
})

export class FavLocationComponent implements OnInit {

  public currentCoordinates: Coordinates;
  public searchControl: FormControl;

  @ViewChild("search")
  public searchElementRef: ElementRef;
  public items : Array<any>;

  constructor( private mapsAPILoader: MapsAPILoader, private ngZone: NgZone ) { }

  ngOnInit() {
    this.items = [
      {
        favouriteLocation : 'Dehradun, Uttarakhand'
      },
      {
        favouriteLocation : 'Jaipur, Rajasthan'
      },
      {
        favouriteLocation : 'Agra, Uttar Pradesh'
      },
      {
        favouriteLocation : 'Dehradun, Uttarakhand'
      },
      {
        favouriteLocation : 'Jaipur, Rajasthan'
      },
      {
        favouriteLocation : 'Agra, Uttar Pradesh'
      }
    ];
    var location = localStorage.getItem('currentCoordinates');
    if( location == null ){
      this.currentCoordinates = {
        'latitude' : 0,
        'longitude' : 0,
        'locality' : null,
        'city' : null,
        'state' : null,
        'country' : null,
        'timestamp' : 0,
        'zoom' : 0
      };
    } else {
      this.currentCoordinates = JSON.parse( location );
    }

    this.searchControl = new FormControl();
    this.setCurrentPosition();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.currentCoordinates = {
            'latitude' : place.geometry.location.lat(),
            'longitude' : place.geometry.location.lng(),
            'zoom' : 15
          };
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentCoordinates = {
          'latitude' : position.coords.latitude,
          'longitude' : position.coords.longitude,
          'zoom' : 15
        };
      });
    }
  }
}
