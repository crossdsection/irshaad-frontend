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
  public answerData : Array<any>;
  public commentData : Object;
  public commentText : String;
  public answerText : String;
  public replyBox : Object;

  constructor( private http: HttpClient ) { }

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
      requestURL = requestURL + '&parentId=' + parentId;
    }
    this.http.get( requestURL ).subscribe(
      response => {
        if( response['error'] == 0 ){
          this.toggleReplyBox();
          this.answerData = ( this.answerData == null ) ? [] : this.answerData;
          this.commentData = ( this.commentData == null ) ? {} : this.commentData;
          this.replyBox = ( this.replyBox == null ) ? {} : this.replyBox;
          for( var i in response['data'] ){
            response['data'][i].user.profilepic = REQUEST_BASE_URL + response['data'][i].user.profilepic;
            response['data'][i]['dashTimeAgo'] = this.getTimeDiff( response['data'][i].created );
            if( parentId == null ){
              this.answerData.push( response['data'][i] );
              this.replyBox[ response['data'][i]['id'] ] = false;
              this.getComments( postId, response['data'][i]['id'] );
            } else {
              if( !this.commentData[ response['data'][i]['parent_id'] ] ){
                this.commentData[ response['data'][i]['parent_id'] ] = [];
              }
              this.commentData[ response['data'][i]['parent_id'] ].push( response['data'][i] );
              this.commentData[ response['data'][i]['parent_id'] ].sort(function(a,b){
                return b['id'] - a['id'];
              });
            }
          }
          this.answerData.sort(function(a,b){
            return b['id'] - a['id'];
          });
          this.toggleReplyBox();
        }
      },
      error => {
        console.log( error );
      }
    )
  }

  checkSubmit( event, parentId = null ){
    if( event.keyCode == 13 ) {
      console.log( parentId );
      this.submitComment( parentId );
    }
  }

  submitComment( parentId = null ){
    var postData = {};
    postData['post_id'] = this.mcph;
    if( parentId != null ){
      postData['parent_id'] = parentId;
      postData['text'] = this.commentText;
    } else {
      postData['text'] = this.answerText;
    }
    this.http.post( REQUEST_BASE_URL + '/comments/submit', postData ).subscribe(
      response => {
        console.log( response );
        if( response["error"] == 0 ){
          this.commentText = "";
          this.answerText = "";
          this.answerData = [];
          this.commentData = {};
          this.replyBox = {};
          this.getComments( this.mcph );
        }
      },
      err => console.log(err)
    );
  }

  getCommentData( parentId ){
    // console.log( this.commentData );
    if( this.commentData[ parentId ] )
      return this.commentData[ parentId ];
    else
      return null;
  }

  showReplyBox( parentId ){
    if( this.replyBox && this.replyBox[ parentId ] ){
      return this.replyBox[ parentId ];
    } else {
      return null;
    }
  }

  toggleReplyBox( parentId = null ){
    if( parentId != null && this.replyBox != null && this.replyBox[ parentId ] != null ){
      this.replyBox[ parentId ] = !this.replyBox[ parentId ];
    }
  }
}
