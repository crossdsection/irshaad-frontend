import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-enact-modal',
  templateUrl: './enact-modal.component.html',
  styleUrls: ['./enact-modal.component.css']
})
export class EnactModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
