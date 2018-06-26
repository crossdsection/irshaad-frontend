import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-profilemodal',
  templateUrl: './profilemodal.component.html',
  styles: [`.modal-dialog {
    max-width: 50%;
    margin: 1.75rem auto;
  }  .pro_image {
    width: 50px;
    border-radius: 50%
  } `],
  encapsulation: ViewEncapsulation.None
})
export class ProfileModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
