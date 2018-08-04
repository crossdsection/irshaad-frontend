import { Component, OnInit, ElementRef } from '@angular/core';
import { RightOverlayCommunicationService } from '../services/right-overlay-communication.service';
import { HttpClient } from '@angular/common/http';
import { REQUEST_BASE_URL } from '../globals';
import * as $ from 'jquery';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private element: any;
  user: User;

  mcph: any = "";

  currentlyOpenedTab = "enactions";

  followers: any[] = [];
  followings: any[] = [];

  constructor(private rightOverlayCommunicationService: RightOverlayCommunicationService, private elementRef: ElementRef, private http: HttpClient) {
    this.user = new User();
    this.element = this.elementRef.nativeElement;
  }

  ngOnInit() {
    document.getElementById("rightOverlayContent").appendChild(this.element);
    this.rightOverlayCommunicationService.rightOverlayComponentData.subscribe((data: any) => {
      if(data !== "") {
        let param: any = JSON.parse(data);
        switch(param.action) {
          case "remove":
            if(param.className == "ProfileComponent") {
              this.element.remove();
            }
          break;
        }
      }      
    });
  }

  initUser() {
    let urlToCall: string = REQUEST_BASE_URL + "user/getinfo";
    let dataToSend: any = {};
    if(this.mcph != "") {
      dataToSend = {
        mcph: this.mcph
      };
    }
    this.http.post(urlToCall, dataToSend).subscribe(
      (response: any) => {
        this.user.name = response.data[0].name;
        this.user.email = response.data[0].email;
        this.user.accessRoles = response.data[0].accessRoles;
        this.user.editable = response.data[0].editable;
        this.user.email_verified = response.data[0].email_verified;
        this.user.followerCount = response.data[0].followerCount;
        this.user.followingCount = response.data[0].followingCount;
        this.user.postCount = response.data[0].postCount;
        this.user.draftCount = response.data[0].draftCount;
        this.user.bookmarkCount = response.data[0].bookmarkCount;
        this.user.profilePicture = REQUEST_BASE_URL + response.data[0].profilepic;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Control Tabs
  showEnactions(event: any) {
    $(".detail-tab").removeClass("active");
    $(".detail-tab.world").addClass("active");

    this.currentlyOpenedTab = "enactions";
  }

  showFollowers(event: any) {
    $(".detail-tab").removeClass("active");
    $(".detail-tab.country").addClass("active");

    // Get user's followers list
    let dataToSend: any = {
      searchKey : "",
      page : 1,
      offset : 20,
      mcph : this.mcph
    }
    this.http.post(REQUEST_BASE_URL + "user/getfollowers", dataToSend).subscribe((response: any) => {
      this.followers = response.data;
    }, (error: any) => {
      console.log(error);
    });

    this.currentlyOpenedTab = "followers";
  }

  showFollowing(event: any) {
    $(".detail-tab").removeClass("active");
    $(".detail-tab.state").addClass("active");

    // Get user's following list
    let dataToSend: any = {
      searchKey : "",
      page : 1,
      offset : 20,
      mcph : this.mcph
    }
    this.http.post(REQUEST_BASE_URL + "user/getfollowing", dataToSend).subscribe((response: any) => {
      this.followings = response.data;
    }, (error: any) => {
      console.log(error);
    });

    this.currentlyOpenedTab = "following";
  }

  showBookmarked(event: any) {
    $(".detail-tab").removeClass("active");
    $(".detail-tab.city").addClass("active");

    this.currentlyOpenedTab = "bookmarked";
  }

  showDrafted(event: any) {
    $(".detail-tab").removeClass("active");
    $(".detail-tab.locality").addClass("active");

    this.currentlyOpenedTab = "drafted";
  }

  showStats(event: any) {
    $(".detail-tab").removeClass("active");
    $(".detail-tab.locality").addClass("active");

    this.currentlyOpenedTab = "stats";
  }

}

// User Class to handle User data.
class User {

  editable: boolean = false;

  name: string = "";
  email: string = "";
  email_verified: boolean = false;
  accessRoles: any[] = [];
  followerCount: number = 0;
  followingCount: number = 0;
  postCount: number = 0;
  draftCount: number = 0;
  bookmarkCount: number = 0;
  profilePicture: string = "assets/img/giphy.webp";

}