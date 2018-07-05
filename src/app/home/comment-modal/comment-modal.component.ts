import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { ViewEncapsulation } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CommentModalComponent implements OnInit {
  postData : Object;
  commentData : Array<any>;
  commentText : String;
  rootUrl : String;
  commentAlert : Number;

  constructor( public activeModal: NgbActiveModal, private httpService: HttpService ) {
    this.rootUrl = this.httpService.apiRoot;
    this.commentAlert = 0;
  }

  ngOnInit() { }

  setPostId( arg ){
    this.postData = arg;
    this.getComments( this.postData['id'] );
  }

  getTimeDiff( datetime ) {
    var oDatePublished = new Date( datetime );
    var oToday = new Date();
    let nDiff = oToday.getTime() - oDatePublished.getTime();
    let oResult = {
      days : 0,
      hours : 0,
      minutes : 0,
      seconds : 0
    };
    // Get diff in days
    oResult.days = Math.floor(nDiff / 1000 / 60 / 60 / 24);
    nDiff -= oResult.days * 1000 * 60 * 60 * 24;
    // Get diff in hours
    oResult.hours = Math.floor(nDiff / 1000 / 60 / 60);
    nDiff -= oResult.hours * 1000 * 60 * 60;
    // Get diff in minutes
    oResult.minutes = Math.floor(nDiff / 1000 / 60);
    nDiff -= oResult.minutes * 1000 * 60;
    // Get diff in seconds
    oResult.seconds = Math.floor(nDiff / 1000);
    var pluralSingular = '';
    var returnText = 'Just Now!';
    if ( oResult.days != 0 ){
      pluralSingular = ( oResult.days == 1 ) ? 'Day' : 'Days';
      returnText = oResult.days + ' ' + pluralSingular + ' Ago!';
    } else if( oResult.hours != 0 ){
      pluralSingular = ( oResult.hours == 1 ) ? 'Hour' : 'Hours';
      returnText = oResult.hours + ' ' + pluralSingular + ' Ago!';
    } else if( oResult.minutes != 0 ){
      pluralSingular = ( oResult.minutes == 1 ) ? 'Minute' : 'Minutes';
      returnText = oResult.minutes + ' ' + pluralSingular + ' Ago!';
    } else if( oResult.seconds != 0 ){
      pluralSingular = ( oResult.seconds == 1 ) ? 'Second' : 'Seconds';
      returnText = oResult.seconds + ' ' + pluralSingular + ' Ago!';
    }
    return returnText;
  }

  getComments( postId ){
    this.httpService.doGET( '/comments/get/' + postId ).subscribe(
      response => {
        if( response['error'] == 0 ){
          for( var i in response['data'] ){
            response['data'][i].user.profilepic = this.rootUrl + response['data'][i].user.profilepic;
            response['data'][i]['dashTimeAgo'] = this.getTimeDiff( response['data'][i].created );
          }
          console.log( response['data'] );
          this.commentData = response['data'];
          this.commentData.sort(function(a,b){
            return b['id'] - a['id'];
          });
          console.log( this.commentData );
        }
      },
      err => console.log( err )
    );
  }

  checkSubmit( event ){
    if( event.keyCode == 13 ) {
      this.submitComment();
    }
  }

  submitComment(){
    console.log( this.commentText );
    var postData = {};
    postData['post_id'] = this.postData['id'];
    postData['text'] = this.commentText;
    this.httpService.doPOST( '/comments/submit', postData ).subscribe(
      response => {
        if( response["error"] == 0 ){
          this.commentText = "";
          this.commentAlert = 1;
          this.getComments( this.postData['id'] );
        } else {
          this.commentAlert = -1;
        }
      },
      err => console.log(err)
    );
  }
}
