import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { RightOverlayCommunicationService } from '../services/right-overlay-communication.service';
import { REQUEST_BASE_URL } from '../globals';
import { HttpClient } from '@angular/common/http';
import { LoginPopupComponent } from '../login-popup/login-popup.component';

@Component({
  selector: 'app-enact-detail',
  templateUrl: './enact-detail.component.html',
  styleUrls: ['./enact-detail.component.css']
})
export class EnactDetailComponent implements OnInit {

  public mcph: string;
  public element: any = null;

  isVoting: boolean = false;

  public post: any = null;

  public _loggedIn : Boolean = false;

  public displayStackIndex: number;

  // Post Data
  hasImages: boolean = false;
  public _polls : Array<Object>;
  public _userPollStatus : Boolean = false;
  public _post : Object;

  @ViewChild("loginPopupContainer", {read: ViewContainerRef}) loginPopupContainer;

  constructor(private http: HttpClient, private rightOverlayCommunicationService: RightOverlayCommunicationService,  private elementRef: ElementRef, private componentFactoryResolver: ComponentFactoryResolver ) {
    this.element = this.elementRef.nativeElement;

    this.http.get(REQUEST_BASE_URL + "user/getinfo").subscribe((response: any) => {
      this._loggedIn = true;
      },
      error => {
      if(error.status) {
        this._loggedIn = false;
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
    document.getElementById("rightOverlayContent").style.overflow = "hidden";
    console.log("Post");
    console.log(this.post);
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
      console.log("Updated Post");
      console.log(this.post);
      /*if(this.post.files.images.length != 0) {
        this.hasImages = true;
        this.post.files.images[0].filepath = REQUEST_BASE_URL + this.post.files.images[0].filepath;
      }*/
      this._post = this.post;
      let date = new Date( this._post['created'] );
      this._post['user']['profilepic'] = REQUEST_BASE_URL + this._post['user']['profilepic'];
      this._post['postDate'] = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
      this._post['postTime'] = ( ( date.getHours() < 12) ? date.getHours() : date.getHours() - 12 ) + ':' + date.getMinutes() + ' ' + ( ( date.getHours() < 12 ) ? "AM" : "PM" );
      for( var i in this._post['files']['images'] ) {
        this._post['files']['images'][i]['filepath'] = REQUEST_BASE_URL + this._post['files']['images'][i]['filepath'];
      }
      this._userPollStatus = this._post['polls']['userPollStatus'];
      if( this._post['polls']['polls'] ){
        this._polls = this._post['polls']['polls'];
      } else {
        this._polls = [];
      }
    });  
  }

  showLoginPopUp(){
    this.loginPopupContainer.createComponent( this.componentFactoryResolver.resolveComponentFactory( LoginPopupComponent ) );
  }

  toggleVoteStatus() {
    this.isVoting = !this.isVoting;
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

}
