import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LogoutService } from './logout.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HttpService {

  constructor( private http: HttpClient, private logoutService: LogoutService ) { }

  apiRoot: string = "http://localhost/worlvoting/";

  doGET( url ) {
    let getUrl = `${this.apiRoot}${url}`;
    return this.http.get( getUrl ).pipe(
      catchError( this.handleError )
    );
  }

  handleError( error : any, res : any ) {
    if (error.status === 500) {
      console.log( error );
    } else if ( error.status === 400 || error.status === 401 ) {
      this.logoutService.logout();
    } else if (error.status === 409) {
      console.log( error );
    } else if (error === 406) {
      console.log( error );
    }
    return throwError(error);
  }

  doPOST( url, postData ) {
    let postUrl = `${this.apiRoot}${url}`;
    let bodyString = JSON.stringify( postData ); // Stringify payload
    return this.http.post( postUrl, bodyString );
  }

  doFileUpload( fileItem:File, extraData?:object ):any{
    let apiCreateEndpoint = `${this.apiRoot}files/submit/`;
    const formData: FormData = new FormData();

    formData.append('file', fileItem, fileItem.name);
    if ( extraData ) {
      for( let key in extraData ){
        formData.append( key, extraData[ key ] )
      }
    }
    const req = new HttpRequest('POST', apiCreateEndpoint, formData, {
      reportProgress: true // for progress data
    });
    return this.http.request(req)
  }

  doGETFileUrl( fileUrl ){
    return `${this.apiRoot}${fileUrl}`;
  }

  doGETFullUrl( fullUrl ) {
    return this.http.get( fullUrl );
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
}
