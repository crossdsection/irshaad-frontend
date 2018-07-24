import { Component, OnInit, ComponentFactoryResolver, ContentChild, ViewContainerRef } from '@angular/core';
import { ComponentCommunicationService } from '../component-communication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private componentCommunicationService: ComponentCommunicationService) { }

  ngOnInit() {
  }

  // When user click on change location link
  changeLocation() {
    this.componentCommunicationService.editChangeLocationComponentDisplay();
  }

}
