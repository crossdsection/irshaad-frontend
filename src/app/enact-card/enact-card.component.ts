import { Component, OnInit, Input } from '@angular/core';
import { REQUEST_BASE_URL } from '../globals';

import { RightOverlayCommunicationService } from '../services/right-overlay-communication.service';

@Component({
  selector: 'app-enact-card',
  templateUrl: './enact-card.component.html',
  styleUrls: ['./enact-card.component.css']
})
export class EnactCardComponent implements OnInit {
  
  public _post : Object;

  @Input() set post( post: object ) {
    this._post = post;
    let date = new Date( this._post['created'] );
    this._post['user']['profilepic'] = REQUEST_BASE_URL + this._post['user']['profilepic'];
    this._post['postDate'] = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    this._post['postTime'] = ( ( date.getHours() < 12) ? date.getHours() : date.getHours() - 12 ) + ':' + date.getMinutes() + ' ' + ( ( date.getHours() < 12 ) ? "AM" : "PM" );
    for( var i in this._post['files'] ){
      this._post['files'][i]['filepath'] = REQUEST_BASE_URL + this._post['files'][i]['filepath'];
    }
  };

  constructor(private rightOverlayCommuncationService: RightOverlayCommunicationService) {
  }
  ngOnInit() {
  }

  // To view User Profile
  viewUserProfile(mcph: string) {
    this.rightOverlayCommuncationService.invokeRightOverlayWith("ProfileComponent", mcph);
  }

}
