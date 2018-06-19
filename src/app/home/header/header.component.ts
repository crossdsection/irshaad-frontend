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
  public loggedIn: boolean;
  public userInfo: object;
  constructor( private modal: NgbModal, private userService: UserdataService ) { }

  ngOnInit () {
    this.loggedIn = false;
    this.userInfo = this.userService.getUserInfo();
    if( this.userInfo && this.userInfo.length != 0 ){
      this.loggedIn = true;
    }
  }

  onClick() {
    this.modal.open( LoginsignupComponent );
  }
}
