import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(){

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authData = localStorage.getItem('auth_data');
    var newHeader = {};

    let url_to_intercept = new RegExp("https://backend.worldvoting.org/(.*)");

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
      return next.handle( changedReq );
    }
    else {
      return next.handle( request );
    }
  }
}