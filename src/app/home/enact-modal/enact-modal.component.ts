import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-enact-modal',
  templateUrl: './enact-modal.component.html',
  styleUrls: ['./enact-modal.component.css']
})
export class EnactModalComponent implements OnInit {

  enactForm: FormGroup;
  title: FormControl;
  description: FormControl;
  postTypesObj: FormControl;

  postSubmitAlert: Number;
  fileJSON: Array<Number>;
  uploadProgress:number = 0;
  uploadComplete:boolean = false;
  uploadingProgressing:boolean = false;
  serverResponse: any;

  constructor(public activeModal: NgbActiveModal, private httpService: HttpService) { }

  ngOnInit() {
    this.createFormControl();
    this.createFormGroup();
    this.postSubmitAlert = 0;
    this.fileJSON = new Array();
  }

  createFormGroup(){
    this.enactForm = new FormGroup({
      title : this.title,
      description : this.description,
      postTypes : this.postTypesObj
    });
  }

  createFormControl(){
    this.title = new FormControl('', [
        Validators.required
    ]);
    this.description = new FormControl('', [
      Validators.minLength(200),
      Validators.required
    ]);
    this.postTypesObj = new FormControl('');
  }

  onFileChange( event, fileType ) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.httpService.doFileUpload( file ).subscribe(
          event=>this.handleProgress(event),
          error=>{
              console.log("Server error")
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
        for( var i in this.serverResponse['data'] ){
          this.fileJSON.push( this.serverResponse['data'][i] );
        }
      } else {
        console.log( this.serverResponse );
      }
    }
  }

  postSubmit(){
    var postData = {};
    postData['title'] = this.enactForm.value.title;
    postData['details'] = this.enactForm.value.description;
    postData['postType'] = this.enactForm.value.postTypes;
    postData['filejson'] = this.fileJSON;
    postData['city_id'] = 3378;
    console.log( postData);
    this.httpService.doPOST( '/post/submit', postData ).subscribe(
      response => {
        if( response["error"] == 0 ){
          this.postSubmitAlert = 1;
        } else {
          this.postSubmitAlert = -1;
        }
      },
      err => console.log(err)
    );
  }
}
