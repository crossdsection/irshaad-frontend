import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Coordinates } from '../../interfaces/coordinates';
import { } from '@types/googlemaps';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
import { HttpService } from '../../services/http.service';
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

  constructor( private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private httpService: HttpService ) { }

  ngOnInit() {
    this.items = [];
    this.httpService.doGET('/favlocation/get/').subscribe(
      response => {
        if( response['error'] == 0 ){
          for( var i in response['data'] ){
            this.items.push({
              'favouriteLocation' : response['data'][i]
            });
          }
        }
      },
      err => {
        console.log( err );
      }
    );
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

  private directiveArgument(event) {
    this.searchElementRef.nativeElement.focus();
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

  saveFavouriteLocation(){
    var openStreetAPIUrl = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + this.currentCoordinates.latitude + '&lon=' + this.currentCoordinates.longitude;
    this.httpService.doGETFullUrl( openStreetAPIUrl ).subscribe(
      response => {
        var findFirst = function ( keys, needle ) {
           for ( var i in keys) {
        	    for( var j in needle )
               if ( keys[ i ] == needle[ j ] ) return keys[ i ];
           }
           return null;
        };
        const keys = Object.keys( response['address'] );
        var locality = response['address'][ findFirst( keys, ['road', 'suburb'] ) ];
        var city = response['address'][ findFirst( keys, ['city', 'county'] ) ];
        var favCoordinates = {
          'latitude' : this.currentCoordinates.latitude,
          'longitude' : this.currentCoordinates.longitude,
          'locality' : locality,
          'city' : city,
          'state' : response['address'][ 'state' ],
          'country' : response['address'][ 'country' ]
        };
        this.httpService.doPOST( 'favlocation/submit', favCoordinates ).subscribe(
          res => {
            console.log( res );
            // location.reload();
          },
          err => {
            console.log( err )
          }
        );
      },
      err => {
        console.log( err );
      }
    );
  }

  onMouseOver(infoWindow, gm) {
    console.log( gm );
    if( gm.lastOpen != null ) {
        gm.lastOpen.close();
    }
    gm.lastOpen = infoWindow;
    infoWindow.open();
  }
}
