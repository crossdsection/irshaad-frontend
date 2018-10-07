import { Component, OnInit, Input } from '@angular/core';
import { REQUEST_BASE_URL } from '../globals';
import { HttpClient } from '@angular/common/http';

import { RightOverlayCommunicationService } from '../services/right-overlay-communication.service';

@Component({
  selector: 'app-user-summary-tile',
  templateUrl: './user-summary-tile.component.html',
  styleUrls: ['./user-summary-tile.component.css']
})
export class UserSummaryTileComponent implements OnInit {

  @Input() user: any = [];
  requestBaseUrl :string = REQUEST_BASE_URL;
  userLocation: string = "";

  constructor(private http: HttpClient, private rightOverlayCommunicationService: RightOverlayCommunicationService) { }

  ngOnInit() {
    if(this.user.address != "") {
      let split_arr: any[] = this.user.address.split(",");
      this.userLocation = split_arr[split_arr.length - 2] + ", " + split_arr[split_arr.length - 1];
    }
  }

  // Follow & Unfollow user
  followUser(mcph) {
    let urlToCall = REQUEST_BASE_URL + "user/follow";
    let dataToSend = {
      mcph: mcph
    };
    this.http.post(urlToCall, dataToSend).subscribe((response: any) => {
      if(response.error == 0) {
        this.user.follows = true;
        this.rightOverlayCommunicationService.doAction("increaseFollowing");
      }
    });
  }

  unfollowUser(mcph) {
    let urlToCall = REQUEST_BASE_URL + "user/unfollow";
    let dataToSend = {
      mcph: mcph
    };
    this.http.post(urlToCall, dataToSend).subscribe((response: any) => {
      if(response.error == 0) {
        this.user.follows = false;
        this.rightOverlayCommunicationService.doAction("decreaseFollowing");
      }
    });
  }

  // To view User Profile
  viewUserProfile(mcph: string) {
    this.rightOverlayCommunicationService.invokeRightOverlayWith("ProfileComponent", mcph);
  }

}
