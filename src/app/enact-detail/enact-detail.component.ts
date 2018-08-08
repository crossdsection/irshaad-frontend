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
    console.log("MCPH");
    console.log(this.mcph);

    document.getElementById("rightOverlayContent").style.overflow = "hidden";
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
      console.log(response);
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

}
