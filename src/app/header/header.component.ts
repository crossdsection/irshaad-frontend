import { Component, OnInit, ComponentFactoryResolver, ContentChild, ViewContainerRef } from '@angular/core';

import { ChangeLocationComponent } from '../change-location/change-location.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ContentChild('changeLocationContainer', {read: ViewContainerRef}) changeLocationContainer;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    console.log(this.changeLocationContainer);
  }

  // When user click on change location link
  changeLocation() {
    this.changeLocationContainer.createComponent(this.componentFactoryResolver.resolveComponentFactory(ChangeLocationComponent));
  }

}
