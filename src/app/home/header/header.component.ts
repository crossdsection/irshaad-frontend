import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginsignupComponent } from '../loginsignup/loginsignup.component';

import { HttpService } from '../../services/http.service';
import { UserdataService } from '../../services/userdata.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  constructor( private modal: NgbModal, private userService: UserdataService ) { }

  ngOnInit () {
    this.userService.getUserInfo();
  }

  onClick() {
    this.modal.open( LoginsignupComponent );
  }
}
