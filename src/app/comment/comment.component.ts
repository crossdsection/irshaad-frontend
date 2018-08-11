import { Component, Input, OnInit } from '@angular/core';
import { REQUEST_BASE_URL } from '../globals';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input()
  public mcph : String;
  public commentData : Array<any>;
  public commentText : String;

  constructor( private http: HttpClient ) {
  }

  ngOnInit() {
    this.getComments( this.mcph );
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

  getComments( postId = null, parentId = null ){
    var requestURL = REQUEST_BASE_URL + '/comments/get/';
    if( postId != null ){
      requestURL = requestURL + '?postId=' + postId;
    } else {
      return;
    }
    if( parentId != null ){
      requestURL = requestURL + '?parentId=' + parentId;
    }
    this.http.get( requestURL ).subscribe(
      response => {
        if( response['error'] == 0 ){
          for( var i in response['data'] ){
            response['data'][i].user.profilepic = REQUEST_BASE_URL + response['data'][i].user.profilepic;
            response['data'][i]['dashTimeAgo'] = this.getTimeDiff( response['data'][i].created );
          }
          this.commentData = response['data'];
          this.commentData.sort(function(a,b){
            return b['id'] - a['id'];
          });
        }
      },
      error => {
        console.log( error );
      }
    )
  }

  checkSubmit( event ){
    if( event.keyCode == 13 ) {
      this.submitComment();
    }
  }

  submitComment(){
    console.log( this.commentText );
    var postData = {};
    postData['post_id'] = this.mcph;
    postData['text'] = this.commentText;
    this.http.post( REQUEST_BASE_URL + '/comments/submit', postData ).subscribe(
      response => {
        console.log( response );
        if( response["error"] == 0 ){
          this.commentText = "";
          this.getComments( this.mcph );
        } 
      },
      err => console.log(err)
    );
  }

}
