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
    console.log("Called Enact Cards");
    this.getFeeds();
  }

  getFeeds(){
    console.log("Called Get Feeds");
    var getUrl = REQUEST_BASE_URL + "post/get?page=1";
    if(this.mcph != ""){
      getUrl += "&mcph=" + this.mcph;
    }
    if ( this.posttype != null ){
      getUrl = getUrl + '&posttype=' + this.posttype;
    }
    if ( this.filter != null ){
      getUrl = getUrl + '&' + this.filter + '=1';
    }
    this.http.get( getUrl ).subscribe((response: any) => {
      console.log("Response for Enact card");
      console.log(response);
      if( response.error == 0 ) {
        this.enactions = response.data;
      }
    });
  }
}
