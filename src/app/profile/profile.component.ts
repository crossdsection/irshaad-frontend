import { Component, OnInit, ElementRef } from '@angular/core';
import { RightOverlayCommunicationService } from '../services/right-overlay-communication.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { REQUEST_BASE_URL } from '../globals';
import { HttpService } from '../services/http.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public element: any;
  user: User;

  public displayStackIndex: number;

  mcph: any = "";

  currentlyOpenedTab = "enactions";

  followers: any[] = [];
  followings: any[] = [];

  // Profile Picture upload variables
  uploadProgress:number = 0;
  uploadComplete:boolean = false;
  uploadingProgressing:boolean = false;
  serverResponse: any;

  // To edit profile
  isEditing: boolean = false;

  constructor(private rightOverlayCommunicationService: RightOverlayCommunicationService, private elementRef: ElementRef, private http: HttpClient, private httpService: HttpService) {
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
            if(param.className == "ProfileComponent" && param.index == this.displayStackIndex) {
              this.element.remove();
            }
          break;
          case "increaseFollowing":
            this.user.followingCount++;
          break;
          case "decreaseFollowing":
            this.user.followingCount--;
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
        this.user.firstName = response.data[0].firstname;
        this.user.lastName = response.data[0].lastname;
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

        this.user.aboutMe = response.data[0].about;
        this.user.tagline = response.data[0].tagline;
        this.user.gender = response.data[0].gender;
        this.user.dateOfBirth = response.data[0].date_of_birth;
        this.user.phone = response.data[0].phone;
      },
      (error) => {
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
    $(".detail-tab.rwa").addClass("active");

    this.currentlyOpenedTab = "stats";
  }

  showMoreInfo() {
    $(".detail-tab").removeClass("active");
    $(".detail-tab.rwamore-info").addClass("active");

    this.currentlyOpenedTab = "moreInfo";
  }


  // Check for file upload
  editProfilePicture( event, fileType ) {
    let reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.httpService.doProfilePictureUpload( file ).subscribe(
          (event : any)=>{this.handleProgress(event)},
          error=>{
          }
        );
        // need to run CD since file load runs outside of zone
        // this.enactForm.markForCheck();
      };
    }
  }

  handleProgress(event){
    if (event.type === HttpEventType.DownloadProgress) {
      this.uploadingProgressing = true;
      this.uploadProgress = Math.round(100 * event.loaded / event.total);
    }

    if (event.type === HttpEventType.UploadProgress) {
      this.uploadingProgressing = true;
      this.uploadProgress = Math.round(100 * event.loaded / event.total);
    }

    if (event.type === HttpEventType.Response) {
      this.uploadingProgressing = false;
      this.uploadComplete = true;
      this.serverResponse = event.body;
      if( this.serverResponse["error"] == 0 ){
        /*if(fileJSON.length == 1) { 
          this.previewImageSrc = REQUEST_BASE_URL + this.serverResponse['data']['filepath'];
        }*/
        this.user.profilePicture = REQUEST_BASE_URL + this.serverResponse["data"]["profilepic"]["profilepic"];
      } else {
      }
    }
  }

  toggleEditMode() {
    this.isEditing = !this.isEditing;
  }

  updateProfile() {
    let dataToSend: any = {
      firstname: this.user.firstName,
      lastname: this.user.lastName,
      about: this.user.aboutMe,
      tagline: this.user.tagline,
      gender: this.user.gender,
      date_of_birth: this.user.dateOfBirth,
      phone: this.user.phone
    };

    let urlToCall = REQUEST_BASE_URL + "user/update";

    this.http.post(urlToCall, dataToSend).subscribe((response: any) => {
    });

    this.toggleEditMode();
  }

}

// User Class to handle User data.
class User {

  editable: boolean = false;

  name: string = ""; //split phone gender about tagline date_of_birth
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  email_verified: boolean = false;
  accessRoles: any[] = [];
  followerCount: number = 0;
  followingCount: number = 0;
  postCount: number = 0;
  draftCount: number = 0;
  bookmarkCount: number = 0;
  profilePicture: string = "assets/img/giphy.webp";

  gender: string = "";
  aboutMe: string = "";
  dateOfBirth: string = "";
  tagline: string = "";
  phone: string = "";


}