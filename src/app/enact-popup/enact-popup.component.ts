import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import * as $ from 'jquery';
import { REQUEST_BASE_URL, fileJSON } from '../globals';
import { HttpService } from '../services/http.service';
import { ComponentCommunicationService } from '../component-communication.service';

@Component({
  selector: 'app-enact-popup',
  templateUrl: './enact-popup.component.html',
  styleUrls: ['./enact-popup.component.css']
})
export class EnactPopupComponent implements OnInit {
  private element: any;

  activeForm = "court";

  // Global Variables
  postType = "court";

  uploadProgress:number = 0;
  uploadComplete:boolean = false;
  uploadingProgressing:boolean = false;
  serverResponse: any;

  locationContextColor: string = 'black';
  currentPreviewElement: any = null;
  instance: any = this;

  pollInputCount: number = 2;

  // Preview Variables
  previewImageSrc = "";


  title: string = "";
  details: string = "";
  polls: string[] = ["", "", "", "", ""];
  cc: string = "";
  isAnonymous: boolean = false;
  anonymousIconColor: string = "black";

  isDraft: boolean = false;
  draftIconColor: string = "black";

  // User Details
  profilePic: string = "assets/img/giphy.webp";
  userName: string;

  constructor(private elementRef: ElementRef, private http: HttpClient, private httpService: HttpService, private componentCommunicationService: ComponentCommunicationService) {
    this.element = this.elementRef.nativeElement;
    document.body.appendChild(this.element);
  }

  closeThisPopup() {
    this.element.remove(); 
  }

  ngOnInit() {
    let authData = JSON.parse(localStorage.getItem("auth_data"));
    // Getting Profile Picture
    this.http.get(REQUEST_BASE_URL + "user/getinfo").subscribe((response: any) => {
      this.profilePic = REQUEST_BASE_URL + response.data[0].profilepic;
      this.userName = authData.name;
      }, 
      error => {
      if(error.status) {
        this.componentCommunicationService.userLogout();
        // Do Something
      }
    });

    // Changing background color of header of popup according to the context.
    let locationContext = JSON.parse(localStorage.getItem("locationContext"));
    switch(locationContext.type) {
      case 'world': this.locationContextColor = '#71911d';
      break;
      case 'country': this.locationContextColor = '#dd7518';
      break;
      case 'state': this.locationContextColor = '#4d99be';
      break;
      case 'city': this.locationContextColor = '#8e5220';
      break;
      case 'locality': this.locationContextColor = '#b5375f';
      break;
    }
  }

  getSelectedLocation() {
    let selectedLocation: string = "";
    let locationContext: any = JSON.parse(localStorage.getItem("locationContext"));
    let currentCoordinates: any = JSON.parse(localStorage.getItem("currentCoordinates"));
    switch(locationContext.type) {
      case "locality": 
        selectedLocation = currentCoordinates.locality + ", " + currentCoordinates.city + ", " + currentCoordinates.state + ", " + currentCoordinates.country;
      break;
      case "city": 
        selectedLocation = currentCoordinates.city + ", " + currentCoordinates.state + ", " + currentCoordinates.country;
      break;
      case "state": 
        selectedLocation = currentCoordinates.state + ", " + currentCoordinates.country;
      break;
      case "country": 
        selectedLocation = currentCoordinates.country;
      break;
      case "world": 
        selectedLocation = "World";
      break;
    }
    return selectedLocation;
  }

  setActiveForm(form: string) {
    this.activeForm = form;
    $(".tab-button").removeClass("tab-button-active");
    $("." + form).addClass("tab-button-active");
  }

  submitPostData() {
    let currentCoordinates = JSON.parse(localStorage.getItem("currentCoordinates"));
    let locationContext = JSON.parse(localStorage.getItem("locationContext"));
    let dataToSend = {
      title: this.title,
      details: this.details,
      postType: this.activeForm,
      filejson: fileJSON, 
      polls: this.polls,
      cc: this.cc,
      anonymous: this.isAnonymous,
      draft: this.isDraft,
      latitude: currentCoordinates.latitude,
      longitude: currentCoordinates.longitude,
      locality: currentCoordinates.locality,
      city: currentCoordinates.city,
      state: currentCoordinates.state,
      country: currentCoordinates.country,
      country_code: currentCoordinates.countryShortName,
      level: locationContext.type,
      department_id: ""
    }

    this.http.post(REQUEST_BASE_URL + "post/submit", dataToSend).subscribe(
      (response: any) => {
        this.closeThisPopup();  
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  // Check for file upload
  onFileChange( event, fileType ) {
    let reader = new FileReader();

    // Create element for preview
    this.currentPreviewElement = document.createElement("label");
    this.currentPreviewElement.className = "file-upload-label";
    this.currentPreviewElement.innerHTML = "&nbsp; &nbsp;";

    let closeIcon = document.createElement("span");
    closeIcon.className = "file-upload-label-close-icon";
    closeIcon.title = "Remove Media";
    closeIcon.innerHTML = '<i class="fa fa-close"></i>';
    $(closeIcon).on("click", function() {
      let index = ($(this).parent().attr("data-index"));
      fileJSON.splice(fileJSON.indexOf(index), 1);
      if(fileJSON.length == 0) { 
        this.previewImageSrc = "";
      }
      else {
        this.previewImageSrc = fileJSON[0];
      }
      $(this).parent().remove();
    });

    $(this.currentPreviewElement).append(closeIcon);

    $("#preview-upload-area").append(this.currentPreviewElement);
    

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.httpService.doFileUpload( file ).subscribe(
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
        // for( var i in this.serverResponse['data'] ){
        fileJSON.push( this.serverResponse['data']["fileId"] );
        $(this.currentPreviewElement).attr("data-index", this.serverResponse['data']['fileId']);
        this.currentPreviewElement.style.background = "url('" + REQUEST_BASE_URL + this.serverResponse['data']['filepath'] + "')";
        this.currentPreviewElement.style.backgroundSize = "cover";
        this.currentPreviewElement.style.backgroundRepeat = "no-repeat";

        // Setting up preview image source
        if(fileJSON.length == 1) { 
          this.previewImageSrc = REQUEST_BASE_URL + this.serverResponse['data']['filepath'];
        }
        // }
      } else {
      }
    }
  }

  addPollInput() {
    this.pollInputCount++;
    if(this.pollInputCount > 5) this.pollInputCount = 5;
  }

  removePollInput(index: number) {
    this.pollInputCount--;
    if(this.pollInputCount < 2) this.pollInputCount = 2;

    this.polls[index] = "";

  }

  toggleAnonymity() {
    this.isAnonymous = !this.isAnonymous;
    this.anonymousIconColor = (this.isAnonymous) ? "#80bdff" : "#000000";
  }

  toggleDraftStatus() {
    this.isDraft = !this.isDraft;
    this.draftIconColor = (this.isDraft) ? "#80bdff" : "#000000";
  }

}
