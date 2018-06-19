import { Injectable } from '@angular/core';
import { HttpService } from './http.service'

@Injectable()
export class UserdataService {

  constructor( private httpService: HttpService ) { }

  getUserInfo() {
    var userInfo = localStorage.getItem('userinfo');
    if (userInfo) {
      return JSON.parse( userInfo );
    } else {
      this.httpService.doGET( 'user/getinfo' ).subscribe(
        response => {
          console.log( response );
          if( response["error"] == 0 ){
            localStorage.setItem('userinfo', JSON.stringify(response['data']) );
          } else {
            return false;
          }
        },
        err => console.log(err)
      );
    }
  }
}
