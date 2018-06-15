import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HttpService {

  constructor( private http:HttpClient ) { }

  apiRoot: string = "http://localhost/worlvoting/";

  doGET( url ) {
    let getUrl = `${this.apiRoot}${url}`;
    let userData = localStorage.getItem('userData');
    if( userData ){
      userData = JSON.parse( userData );
      let bearerToken = userData['data']['bearerToken'];
      if ( bearerToken && bearerToken.length != 0 ) {
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': ':Bearer ' + bearerToken
          })
        };
      }
    } else {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
    }
    return this.http.get( getUrl, httpOptions );
  }

  doPOST( url, postData ) {
    let postUrl = `${this.apiRoot}${url}`;
    let userData = localStorage.getItem('userData');
    if( userData ){
      userData = JSON.parse( userData );
      let bearerToken = userData['data']['bearerToken'];
      if ( bearerToken && bearerToken.length != 0 ) {
        let httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': ':Bearer ' + bearerToken
          })
        };
      }
    } else {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
    }

    let bodyString = JSON.stringify( postData ); // Stringify payload

    return this.http.post( postUrl, bodyString, httpOptions );
  }

  doPUT() {
   console.log("PUT");
  }

  doDELETE() {
   console.log("DELETE");
  }

  doGETAsPromise() {
   console.log("GET AS PROMISE");
  }

  doGETAsPromiseError() {
   console.log("GET AS PROMISE ERROR");
  }

  doGETAsObservableError() {
   console.log("GET AS OBSERVABLE ERROR");
  }

  doGETWithHeaders() {
   console.log("GET WITH HEADERS");
  }

  // var request = request.clone({
  //   setHeaders: {
  //     Authorization: `Bearer ${this.auth.getToken()}`
  //   }
  // });
}
