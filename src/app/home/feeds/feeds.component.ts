import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileModalComponent } from '../profilemodal/profilemodal.component';
import { CommentModalComponent } from '../comment-modal/comment-modal.component';

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

  constructor( private modal: NgbModal, private userdata: UserdataService, private httpService: HttpService ) {
    // this.profilePic = this.userdata.getProfilePic();
  }

  profileModal() {
    this.modal.open( ProfileModalComponent );
  }

  commentModal() {
    this.modal.open( CommentModalComponent );
  }

  ngOnInit() {
    var date = null;
    this.httpService.doGET( '/post/get' ).subscribe(
      response => {
        if( response["error"] == 0 ){
          this.feedCourtData = response['data']['court'];
          this.feedDiscussionData = response['data']['discussion'];
          this.feedNewsData = response['data']['news'];
          for( var i in this.feedCourtData ){
            this.feedCourtData[i]['user']['profilepic'] = this.httpService.doGETFileUrl( this.feedCourtData[i]['user']['profilepic'] );
            date = new Date( this.feedCourtData[i]['created'] );
            this.feedCourtData[i]['created'] = date.getDate() + '-' + ( date.getMonth() + 1 ) + '-' + date.getFullYear();
            var files = this.feedCourtData[i]['files'];
            var tmpFiles = { 'images' : [], 'video' : [], 'downloads' : []};
            for( var j in files ){
              if( files[j]['filetype'].indexOf( 'image' ) !== -1 ){
                var filePath = this.httpService.doGETFileUrl( files[j]['filepath'] );
                tmpFiles['images'].push(filePath);
              }
              if( files[j]['filetype'].indexOf( 'video' ) !== -1 ){
                var filePath = this.httpService.doGETFileUrl( files[j]['filepath'] );
                tmpFiles['video'].push(filePath);
              }
              if( files[j]['filetype'].indexOf( 'application' ) !== -1 ){
                var filePath = this.httpService.doGETFileUrl( files[j]['filepath'] );
                tmpFiles['downloads'].push(filePath);
              }
              this.feedCourtData[i]['files'] = tmpFiles;
            }
          }

          for( var i in this.feedDiscussionData ){
            this.feedDiscussionData[i]['user']['profilepic'] = this.httpService.doGETFileUrl( this.feedDiscussionData[i]['user']['profilepic'] );
            date = new Date( this.feedDiscussionData[i]['created'] );
            this.feedDiscussionData[i]['created'] = date.getDate() + '-' + ( date.getMonth() + 1 ) + '-' + date.getFullYear()
            var files = this.feedDiscussionData[i]['files'];
            var tmpFiles = { 'images' : [], 'video' : [], 'downloads' : []};
            for( var j in files ){
              if( files[j]['filetype'].indexOf( 'image' ) !== -1 ){
                var filePath = this.httpService.doGETFileUrl( files[j]['filepath'] );
                tmpFiles['images'].push(filePath);
              }
              if( files[j]['filetype'].indexOf( 'video' ) !== -1 ){
                var filePath = this.httpService.doGETFileUrl( files[j]['filepath'] );
                tmpFiles['video'].push(filePath);
              }
              if( files[j]['filetype'].indexOf( 'application' ) !== -1 ){
                var filePath = this.httpService.doGETFileUrl( files[j]['filepath'] );
                tmpFiles['downloads'].push(filePath);
              }
              this.feedDiscussionData[i]['files'] = tmpFiles;
            }
          }

          for( var i in this.feedNewsData ){
            this.feedNewsData[i]['user']['profilepic'] = this.httpService.doGETFileUrl( this.feedNewsData[i]['user']['profilepic'] );
            date = new Date( this.feedNewsData[i]['created'] );
            this.feedNewsData[i]['created'] = date.getDate() + '-' + ( date.getMonth() + 1 ) + '-' + date.getFullYear()
            var files = this.feedNewsData[i]['files'];
            var tmpFiles = { 'images' : [], 'video' : [], 'downloads' : []};
            for( var j in files ){
              if( files[j]['filetype'].indexOf( 'image' ) !== -1 ){
                var filePath = this.httpService.doGETFileUrl( files[j]['filepath'] );
                tmpFiles['images'].push(filePath);
              }
              if( files[j]['filetype'].indexOf( 'video' ) !== -1 ){
                var filePath = this.httpService.doGETFileUrl( files[j]['filepath'] );
                tmpFiles['video'].push(filePath);
              }
              if( files[j]['filetype'].indexOf( 'application' ) !== -1 ){
                var filePath = this.httpService.doGETFileUrl( files[j]['filepath'] );
                tmpFiles['downloads'].push(filePath);
              }
              this.feedNewsData[i]['files'] = tmpFiles;
          }
          }
          return true;
        }
      },
      err => console.log(err)
    );
  }
}
