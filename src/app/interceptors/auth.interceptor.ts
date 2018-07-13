import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(){

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let userData = localStorage.getItem('userData');
    var newHeader = {};
    if( userData ){
      userData = JSON.parse( userData );
      let bearerToken = userData['bearerToken'];
      if ( bearerToken && bearerToken.length != 0 ) {
        newHeader['Authorization'] = `:Bearer ${bearerToken}`;
      }
    }
    let changedReq = request.clone({
      setHeaders : newHeader
    });
    return next.handle( changedReq );
  }
}
