import { Injectable } from '@angular/core';
import { HttpService } from './http.service'

@Injectable()
export class UserdataService {

  constructor( private httpService: HttpService ) { }

  getUserInfo() {
    var userInfo = localStorage.getItem('userinfo');
    console.log( userInfo );
    if (userInfo != null && JSON.parse( userInfo ).length != 0 ) {
      return JSON.parse( userInfo );
    } else {
      this.httpService.doGET( 'user/getinfo' ).subscribe(
        response => {
          console.log( response );
          if( response["error"] == 0 ){
            localStorage.setItem('userinfo', JSON.stringify(response['data']) );
            return response['data'];
          } else {
            return false;
          }
        },
        err => {
            console.log( err )
        }
      );
    }
  }

  getProfilePic(){
    var userInfo = localStorage.getItem('userinfo');
    var profilepic = '';
    if( userInfo ){
      profilepic = this.httpService.doGETFileUrl( JSON.parse(userInfo)['profilepic'] );
    }
    return profilepic;
  }
}
