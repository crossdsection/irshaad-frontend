import { Injectable } from '@angular/core';
import { REQUEST_BASE_URL } from '../globals';
import { HttpRequest, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  doFileUpload( fileItem:File, extraData?:object ):any{
    let apiCreateEndpoint = `${REQUEST_BASE_URL}files/submit/`;
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
    return this.http.request(req);
  }

  doProfilePictureUpload( fileItem:File, extraData?:object ):any{
    let apiCreateEndpoint = `${REQUEST_BASE_URL}user/changepicture`;
    const formData: FormData = new FormData();

    formData.append('profile', fileItem, fileItem.name);
    if ( extraData ) {
      for( let key in extraData ){
        formData.append( key, extraData[ key ] )
      }
    }
    const req = new HttpRequest('POST', apiCreateEndpoint, formData, {
      reportProgress: true // for progress data
    });
    return this.http.request(req);
  }
}
