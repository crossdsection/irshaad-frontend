import { Component, OnChanges, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { REQUEST_BASE_URL } from '../globals';
import { LoginPopupComponent } from '../login-popup/login-popup.component';

@Component({
  selector: 'app-enact-cards',
  templateUrl: './enact-cards.component.html',
  styleUrls: ['./enact-cards.component.css']
})
export class EnactCardsComponent implements OnChanges {

  @Input() posttype : String;
  @Input() filter : String;
  @Input() mcph : String = "";

  public _loggedIn : Boolean = false;
  public enactions : Array<Object>;

  @ViewChild("loginPopupContainer", {read: ViewContainerRef}) loginPopupContainer;

  constructor( private http: HttpClient, private componentFactoryResolver: ComponentFactoryResolver ) {
    this.http.get(REQUEST_BASE_URL + "user/getinfo").subscribe((response: any) => {
      this._loggedIn = true;
      },
      error => {
      if(error.status) {
        this._loggedIn = false;
      }
    });
  }

  ngOnChanges() {
    this.getFeeds();
  }

  getFeeds(){
    var getUrl = REQUEST_BASE_URL + "post/get";

    if( this.filter == "bookmark" ) {
      let urlToCall = REQUEST_BASE_URL + "post/getbookmarks";
      let dataToSend = {
        searchKey : "",
        page : 1,
        offset : 20

      };
      this.http.post( urlToCall, dataToSend ).subscribe((response: any) => {
        if( response.error == 0 ) {
          this.enactions = response.data;
          // console.log(response.data);
        }
      });
      return;
    }

    let dataToSend: any = {
      page: 1
    };
    if( this.mcph != "" ){
      dataToSend['mcph'] = this.mcph;
    }
    if( this.posttype != null ){
      dataToSend['posttype'] = this.posttype;
    }
    if( this.filter != null ){
      dataToSend[ "" + this.filter ] = 1;
    }
    this.http.post( getUrl, dataToSend ).subscribe((response: any) => {
      if( response.error == 0 ) {
        this.enactions = response.data;
      }
    });
  }

  showLoginPopUp(){
    this.loginPopupContainer.createComponent( this.componentFactoryResolver.resolveComponentFactory( LoginPopupComponent ) );
  }
}
