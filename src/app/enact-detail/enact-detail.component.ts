import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { RightOverlayCommunicationService } from '../services/right-overlay-communication.service';
import { REQUEST_BASE_URL } from '../globals';
import { HttpClient } from '@angular/common/http';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { ComponentCommunicationService } from '../component-communication.service';

@Component({
  selector: 'app-enact-detail',
  templateUrl: './enact-detail.component.html',
  styleUrls: ['./enact-detail.component.css']
})
export class EnactDetailComponent implements OnInit {

  public mcph: string;
  public element: any = null;
  public shareLink: string = "";

  isVoting: boolean = false;
  isSharing: boolean = false;

  public post: any = null;

  public _loggedIn : Boolean = false;

  public displayStackIndex: number;

  // Post Data
  hasImages: boolean = false;
  public _polls : Array<Object>;
  public _userPollStatus : Boolean = false;
  public _post : Object;

  @ViewChild("loginPopupContainer", {read: ViewContainerRef}) loginPopupContainer;

  constructor(private http: HttpClient, private rightOverlayCommunicationService: RightOverlayCommunicationService,  private elementRef: ElementRef, private componentFactoryResolver: ComponentFactoryResolver, private componentCommunicationService: ComponentCommunicationService ) {
    this.element = this.elementRef.nativeElement;

    this.http.get(REQUEST_BASE_URL + "user/getinfo").subscribe((response: any) => {
      this._loggedIn = true;
      },
      error => {
      if(error.status) {
        this._loggedIn = false;
        this.componentCommunicationService.userLogout();
      }
    });
   }

  ngOnInit() {
    document.getElementById("rightOverlayContent").appendChild(this.element);
    this.rightOverlayCommunicationService.rightOverlayComponentData.subscribe((data: any) => {
      if(data !== "") {
        let param: any = JSON.parse(data);
        switch(param.action) {
          case "remove":
            if(param.className == "EnactDetailComponent" && param.index == this.displayStackIndex) {
              this.element.remove();
            }
          break;
        }
      }
    });
    // document.getElementById("rightOverlayContent").style.overflow = "hidden";
  }

  initPost() {
    // Get details of the post.
    let dataToSend = {
      postId: this.mcph
    };
    let urlToCall = REQUEST_BASE_URL + "post/getpost";
    // urlToCall = encodeURIComponent(urlToCall);

    this.http.post(urlToCall, dataToSend).subscribe((response: any) => {
      this.post = response.data[0];
      /*if(this.post.files.images.length != 0) {
        this.hasImages = true;
        this.post.files.images[0].filepath = REQUEST_BASE_URL + this.post.files.images[0].filepath;
      }*/
      // this.post = this.post;
      let date = new Date( this.post['created'] );
      this.post['user']['profilepic'] = REQUEST_BASE_URL + this.post['user']['profilepic'];
      this.post['postDate'] = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
      this.post['postTime'] = ( ( date.getHours() < 12) ? date.getHours() : date.getHours() - 12 ) + ':' + date.getMinutes() + ' ' + ( ( date.getHours() < 12 ) ? "AM" : "PM" );
      if( this.post['files'] != null ){
        for( var i in this.post['files']['images'] ) {
          var newJSON = {
            "id" : this.post['id'] + 'image' + i,
            "filepath" : REQUEST_BASE_URL + this.post['files']['images'][i]['filepath'],
            "filetype" : this.post['files']['images'][i]['filetype']
          };
          this.post['files']['images'][i] = new Object( newJSON );
        }
      }
      this._userPollStatus = this.post['polls']['userPollStatus'];
      if( this.post['polls']['polls'] ){
        this._polls = this.post['polls']['polls'];
      } else {
        this._polls = [];
      }
      this.shareLink = "http://localhost:4200/" + "enactions/" + this.post['id'];
    });
  }

  showLoginPopUp(){
    this.loginPopupContainer.createComponent( this.componentFactoryResolver.resolveComponentFactory( LoginPopupComponent ) );
  }

  toggleVoteStatus() {
    this.isVoting = !this.isVoting;
  }

  toggleShareStatus() {
    this.isSharing = !this.isSharing;
  }

  printThis() {
    window.print();
  }

  openFullscreen(event: any) {
    let elem: any = document.querySelector(".enact-detail-row");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }

  addPoll( pollId, postId ){
    let dataToSend: any = {
      'poll_id' : pollId,
      'post_id' : postId
    };
    this.http.post( REQUEST_BASE_URL + '/polls/submit', dataToSend ).subscribe((response: any) => {
      if( response.error == 0 ) {
        let polls = response.data[0];
        this._userPollStatus = polls['userPollStatus'];
        if( polls['polls'] ){
          this._polls = polls['polls'];
        }
      }
    });
  }

  changeActivityStatus( postId, postJSON ){
    let dataToSend: any = {
      "post_id": postId
    };
    if( postJSON['bookmark'] ){
      dataToSend['bookmark'] = postJSON['bookmark'];
    }
    if( postJSON['flag'] ){
      dataToSend['flag'] = postJSON['flag'];
    }
    this.http.post( REQUEST_BASE_URL + '/activity/submit', dataToSend ).subscribe((response: any) => {
      if( response.error == 0 ){
        this.post['props'] = response.data;
      }
    });
  }

}
