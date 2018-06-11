import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HttpService {

  constructor( private http:HttpClient ) { }

  apiRoot: string = "https://localhost/worldvoting/worldvote.back";

  doGET() {
   console.log("GET");
  }

  doPOST( url, postData ) {
   let postUrl = `${this.apiRoot}${url}` ;
   console.log( postUrl );
   const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
   this.http.post( postUrl, postData, httpOptions ).subscribe(
      res => console.log(res)
    );
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
