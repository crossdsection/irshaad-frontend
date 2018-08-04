import { Component, OnChanges, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { REQUEST_BASE_URL } from '../globals';

@Component({
  selector: 'app-enact-cards',
  templateUrl: './enact-cards.component.html',
  styleUrls: ['./enact-cards.component.css']
})
export class EnactCardsComponent implements OnChanges {

  @Input() posttype : String;
  @Input() filter : String;
  @Input() mcph : String = "";

  public enactions : Array<Object>;

  constructor( private http: HttpClient ) { }

  ngOnChanges() {
    this.getFeeds();
  }

  getFeeds(){
    var getUrl = REQUEST_BASE_URL + "post/get";
    /*if(this.mcph != ""){
      getUrl += "&mcph=" + this.mcph;
    }
    if ( this.posttype != null ){
      getUrl = getUrl + '&posttype=' + this.posttype;
    }
    if ( this.filter != null ){
      getUrl = getUrl + '&' + this.filter + '=1';
    }
    this.http.get( getUrl ).subscribe((response: any) => {
      if( response.error == 0 ) {
        this.enactions = response.data;
      }
    });*/

    if(this.filter == "bookmark") {
      let urlToCall = REQUEST_BASE_URL + "post/getbookmarks";
      let dataToSend = {
        searchKey : "",
        page : 1,
        offset : 20
      }

      this.http.post( urlToCall, dataToSend ).subscribe((response: any) => {
        if( response.error == 0 ) {
          this.enactions = response.data;
          console.log("Bookmarks");
          console.log(this.enactions);
        }
      });

      return;
    }

    let dataToSend: any = {
      page: 1
    };
    if(this.mcph != "" ){
      dataToSend['mcph'] = this.mcph;
    }
    if(this.posttype != null ){
      dataToSend['posttype'] = this.posttype;
    }
    if(this.filter != null ){
      dataToSend[ "" + this.filter ] = 1;
    }
    this.http.post( getUrl, dataToSend ).subscribe((response: any) => {
      if( response.error == 0 ) {
        this.enactions = response.data;
      }
    });
  }
}
