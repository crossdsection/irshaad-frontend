import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { REQUEST_BASE_URL } from '../globals';
import { HttpClient } from '@angular/common/http';
import { RightOverlayCommunicationService } from '../services/right-overlay-communication.service';

@Component({
  selector: 'app-enact-card',
  templateUrl: './enact-card.component.html',
  styleUrls: ['./enact-card.component.css']
})
export class EnactCardComponent implements OnInit {

  public _post : Object;
  public _polls : Array<Object>;
  public _userPollStatus : Boolean = false;
  @Output() showPopUp = new EventEmitter<string>();

  @Input() loggedIn : Boolean;
  @Input() set post( post: object ) {
    if(post != null) {
      this._post = post;
      console.log(post);
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
    }
  };

  constructor(private rightOverlayCommuncationService: RightOverlayCommunicationService, private http: HttpClient ) {
  }

  ngOnInit() {
  }

  // To view User Profile
  viewUserProfile(mcph: string) {
    this.rightOverlayCommuncationService.invokeRightOverlayWith("ProfileComponent", mcph);
  }

  //
  addPoll( pollId, postId ){
    if( this.loggedIn ){
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
    } else {
      this.showPopUp.emit('show');
    }
  }

  changeActivityStatus( postId, postJSON ){
    if( this.loggedIn ){
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
          this._post['props'] = response.data;
        }
      });
    } else {
      this.showPopUp.emit('show');
    }
  }

  openEnactDetails(event: any) {
    console.log("Enact Card");
    console.log(this._post["id"]);
    this.rightOverlayCommuncationService.invokeRightOverlayWith("EnactDetailComponent", this._post["id"]);
  }

}
