import { Component, OnChanges, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef, HostListener, ElementRef } from '@angular/core';
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
  public enactions : Array<Object> = [];
  public page : number = 1;
  public currentHeightScrolled : number = 0;

  @ViewChild("loginPopupContainer", {read: ViewContainerRef}) loginPopupContainer;
  @ViewChild("feedContainer", {read: ViewContainerRef}) feedContainer;

  constructor( private http: HttpClient, private componentFactoryResolver: ComponentFactoryResolver, private el : ElementRef ) {
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
    this.getFeeds( this.page );
  }

  @HostListener("window:scroll", ['$event'])
  onScroll(event: any) {
    let height = this.feedContainer.element.nativeElement.getBoundingClientRect().height;
    let scrollTop = -( this.feedContainer.element.nativeElement.getBoundingClientRect().top );
    if ( ( scrollTop / height ) > 0.75 && this.currentHeightScrolled < height ) {
      this.page++;
      this.currentHeightScrolled = height;
      this.getFeeds( this.page, true ); //true => Change Context
    }
  }

  getFeeds( page: number = 1, keepContext = false ){
    var getUrl = REQUEST_BASE_URL + "post/get";
    if( !keepContext ){
      this.currentHeightScrolled = 0;
      this.page = 1;
      page = 1;
    }
    if( this.filter == "bookmark" ) {
      let urlToCall = REQUEST_BASE_URL + "post/getbookmarks";
      let dataToSend = {
        searchKey : "",
        page : page,
        offset : 20

      };
      this.http.post( urlToCall, dataToSend ).subscribe((response: any) => {
        if( response.error == 0 ) {
          if( keepContext ){
            for( var i in response.data ){
              this.enactions.push( response.data[i] );
            }
          } else {
            this.enactions = response.data;
          }
        }
      });
      return;
    }

    let dataToSend: any = {
      page: page
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
        if( keepContext ){
          for( var i in response.data ){
            this.enactions.push( response.data[i] );
          }
        } else {
          this.enactions = response.data;
        }
      }
    });
  }

  showLoginPopUp(){
    this.loginPopupContainer.createComponent( this.componentFactoryResolver.resolveComponentFactory( LoginPopupComponent ) );
  }
}
