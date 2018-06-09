import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HttpService {

  constructor( private http:HttpClient ) { }

  apiRoot: string = "http://httpbin.org";

  constructor(private http: Http) { }

  doGET() {
   console.log("GET");
  }

  doPOST( url, postData ) {
   console.log("POST");
   let url = `${this.apiRoot}`;
   this.http.post(url, {moo:"foo",goo:"loo"}).subscribe(res => console.log(res.json()));
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

  var request = request.clone({
    setHeaders: {
      Authorization: `Bearer ${this.auth.getToken()}`
    }
  });
}
