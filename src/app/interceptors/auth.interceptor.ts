import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { REQUEST_BASE_URL } from '../globals';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(){

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authData = localStorage.getItem('auth_data');
    var newHeader = {};

    let url_to_intercept = new RegExp("" + REQUEST_BASE_URL + "(.*)");

    if(url_to_intercept.test(request.url)) {
      if( authData ){
          authData = JSON.parse( authData );
        let bearerToken = authData['bearerToken'];
        if ( bearerToken && bearerToken.length != 0 ) {
          newHeader['Authorization'] = `:Bearer ${bearerToken}`;
        }
      }
      let changedReq = request.clone({
        setHeaders : newHeader
      });
      console.log( changedReq );
      return next.handle( changedReq );
    }
    else {
      return next.handle( request );
    }
  }
}
