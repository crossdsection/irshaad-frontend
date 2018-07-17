import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { LoginPopupComponent } from '../login-popup/login-popup.component';

@Component({
  selector: 'app-header-profile-icon',
  templateUrl: './header-profile-icon.component.html',
  styleUrls: ['./header-profile-icon.component.css']
})
export class HeaderProfileIconComponent implements OnInit {

  // For loading login popup component
  @ViewChild("loginPopupContainer", {read: ViewContainerRef}) loginPopupContainer;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    
  }

  // Click Event Handler
  showLoginPopup() {
    this.loginPopupContainer.createComponent(this.componentFactoryResolver.resolveComponentFactory(LoginPopupComponent));
  }

}
