import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginsignupComponent } from '../loginsignup/loginsignup.component';

 @Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private modal: NgbModal) { }

  onClick() {
    this.modal.open(LoginsignupComponent);
  }

  ngOnInit() {

  }

}
