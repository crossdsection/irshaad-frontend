import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileModalComponent } from '../profilemodal/profilemodal.component';
import { CommentModalComponent } from '../comment-modal/comment-modal.component';
import { LoginsignupComponent } from '../loginsignup/loginsignup.component';

import { HttpService } from '../../services/http.service';
import { UserdataService } from '../../services/userdata.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})

export class FeedsComponent implements OnInit {

  feedCourtData : any;
  feedDiscussionData : any;
  feedNewsData : any;
  loggedIn: boolean;

  constructor( private modal: NgbModal, private userService: UserdataService, private httpService: HttpService ) {
    this.loggedIn = false;
    let userInfo = this.userService.getUserInfo();
    if( userInfo ){
      this.loggedIn = true;
    }
  }

  profileModal() {
    // this.modal.open( ProfileModalComponent );
    let profileModalRef = this.modal.open( ProfileModalComponent );
    profileModalRef.componentInstance.passedData = {};
  }

  commentModal( index, postType ) {
    if( this.loggedIn ){
      var postData = null;
      switch( postType ){
        case 'court':{
          postData = this.feedCourtData[ index ];
          break;
        }
        case 'discussion':{
          postData = this.feedDiscussionData[ index ];
          break;
        }
        case 'news':{
          postData = this.feedNewsData[ index ];
          break;
        }
      }
      let commentModalRef = this.modal.open( CommentModalComponent );
      commentModalRef.componentInstance.setPostId( postData );
    } else {
      this.modal.open(LoginsignupComponent);
    }
  }

  setupData( feedData ){
    var date = null;
    for( var i in feedData ){
      feedData[i]['user']['profilepic'] = this.httpService.doGETFileUrl( feedData[i]['user']['profilepic'] );
      date = new Date( feedData[i]['created'] );
      feedData[i]['created'] = date.getDate() + '-' + ( date.getMonth() + 1 ) + '-' + date.getFullYear();
      var files = feedData[i]['files'];
      var tmpFiles = { 'images' : [], 'video' : [], 'downloads' : []};
      for( var j in files ){
        if( files[j]['filetype'].indexOf( 'image' ) !== -1 ){
          var filePath = this.httpService.doGETFileUrl( files[j]['filepath'] );
          tmpFiles['images'].push( filePath );
        }
        if( files[j]['filetype'].indexOf( 'video' ) !== -1 ){
          var filePath = this.httpService.doGETFileUrl( files[j]['filepath'] );
          tmpFiles['video'].push( filePath );
        }
        if( files[j]['filetype'].indexOf( 'application' ) !== -1 ){
          var filePath = this.httpService.doGETFileUrl( files[j]['filepath'] );
          tmpFiles['downloads'].push( filePath );
        }
        feedData[i]['files'] = tmpFiles;
      }
    }
    return feedData;
  }

  ngOnInit() {
    this.httpService.doGET( '/post/get' ).subscribe(
      response => {
        if( response["error"] == 0 ){
          this.feedCourtData = this.setupData( response['data']['court'] );
          this.feedDiscussionData = this.setupData( response['data']['discussion'] );
          this.feedNewsData = this.setupData( response['data']['news'] );
          return true;
        }
      },
      err => console.log(err)
    );
  }
}
