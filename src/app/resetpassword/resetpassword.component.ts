import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { REQUEST_BASE_URL } from '../globals';

import { LoginPopupComponent } from '../login-popup/login-popup.component';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  email : String = "";
  token : String = "";

  // For loading login popup component
  @ViewChild("loginPopupContainer", {read: ViewContainerRef}) loginPopupContainer;

  constructor( private activatedRoute: ActivatedRoute, private http: HttpClient, private componentFactoryResolver: ComponentFactoryResolver ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.email = params['email'];
      this.token = params['token'];
      this.handleVerify();
    });
  }

  // Handle Email Verification submit
  handleVerify() {
    let dataToSend = {
      "email": this.email,
      "token" : this.token
    }
    console.log( dataToSend);
    this.http.post( REQUEST_BASE_URL + "user/verify", dataToSend ).subscribe((response: any) => {
      console.log( response );
      if( response.error == 0 ) {
        localStorage.setItem( "auth_data", JSON.stringify( response.data ) );
        this.showLoginPopup();
      } else {
        alert( "Verification Failed." );
      }
    });
  }

  // Click Event Handler
  showLoginPopup() {
    let invoked = this.loginPopupContainer.createComponent( this.componentFactoryResolver.resolveComponentFactory( LoginPopupComponent ) );
    invoked.instance.currentForm = 'newPassword';
  }
}
