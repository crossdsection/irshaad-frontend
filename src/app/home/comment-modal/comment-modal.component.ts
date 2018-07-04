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
  commentData : Object;
  rootUrl : String;

  constructor( public activeModal: NgbActiveModal, private httpService: HttpService ) {
    this.rootUrl = this.httpService.apiRoot;
  }

  ngOnInit() { }

  setPostId( arg ){
    this.postData = arg;
    this.getComments( this.postData['id'] );
  }

  getComments( postId ){
    this.httpService.doGET( '/comments/get/' + postId ).subscribe(
      response => {
        if( response['error'] == 0 ){
          for( var i in response['data'] ){
            response['data'][i].user.profilepic = this.rootUrl + response['data'][i].user.profilepic;
          }
          this.commentData = response['data'];
          console.log( this.commentData );
        }
      },
      err => console.log( err )
    );
  }
}
