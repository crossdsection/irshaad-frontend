import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfilemodalComponent } from '../profilemodal/profilemodal.component';
import { CommentModalComponent } from '../comment-modal/comment-modal.component';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

  constructor(private modal: NgbModal) { }
  profileModal() {
    this.modal.open(ProfilemodalComponent);
  }
  commentModal() {
    this.modal.open(CommentModalComponent);
  }
  ngOnInit() {
  }
}
