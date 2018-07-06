import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginsignupComponent } from '../loginsignup/loginsignup.component';

import { HttpService } from '../../services/http.service';
import { GeolocationService } from '../../services/geolocation.service';
import { UserdataService } from '../../services/userdata.service';
import { LogoutService } from '../../services/logout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  public loggedIn: boolean;
  public userInfo: object;
  constructor( private modal: NgbModal, private userService: UserdataService, private logoutService: LogoutService, private httpService: HttpService, private geolocationService: GeolocationService ) {
    this.loggedIn = false;
    this.userInfo = this.userService.getUserInfo();
    if( this.userInfo ){
      this.loggedIn = true;
    }
  }

  ngOnInit () {
    this.geolocationService.getLocation().subscribe(
      position => {
        var openStreetAPIUrl = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + position.coords.latitude + '&lon=' + position.coords.longitude;
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
            var currentCoordinates = {
              'latitude' : position.coords.latitude,
              'longitude' : position.coords.longitude,
              'timestamp' : position.timestamp,
              'locality' : locality,
              'city' : city,
              'state' : response['address'][ 'state' ],
              'country' : response['address'][ 'country' ]
            };
            localStorage.setItem('currentCoordinates', JSON.stringify( currentCoordinates ) );
          },
          err => {
            console.log( err );
          }
        );
      },
      error => {
        console.log( error );
      }
    );
  }

  onClick() {
    this.modal.open( LoginsignupComponent );
  }

  logOut(){
    this.logoutService.logout();
  }
}
