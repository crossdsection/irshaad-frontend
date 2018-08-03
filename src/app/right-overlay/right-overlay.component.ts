import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { RightOverlayCommunicationService } from '../services/right-overlay-communication.service';
import { ProfileComponent } from '../profile/profile.component';

import * as $ from 'jquery';

@Component({
  selector: 'app-right-overlay',
  templateUrl: './right-overlay.component.html',
  styleUrls: ['./right-overlay.component.css']
})
export class RightOverlayComponent implements OnInit {
  depth: number = -10;
  background: string = "transparent";
  currentComponentInvoked: any = "";

  @ViewChild("rightOverlayContents", {read: ViewContainerRef}) rightOverlayContent;

  constructor(private rightOverlayCommunicationService: RightOverlayCommunicationService, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.rightOverlayCommunicationService.rightOverlayComponentData.subscribe((data: string) => {
      if(data !== "") {
        let param: any = JSON.parse(data);
        switch(param.action) {
          case "invoke":
            this.currentComponentInvoked = param.className;
            switch(this.currentComponentInvoked) {
              case "ProfileComponent": 
                this.showRightOverlay();
                let invoked: any = this.rightOverlayContent.createComponent(this.componentFactoryResolver.resolveComponentFactory(ProfileComponent));
                invoked.instance.mcph = param.mcph;
                invoked.instance.initUser();
              break;
            }
          break;
        }
      }
    });
  }

  showRightOverlay() {
    this.depth = 10;
    this.background = "#0000006e";
  }

  hideRightOverlay() {
    this.rightOverlayCommunicationService.removeFromRightOverlay(this.currentComponentInvoked);

    this.depth = -10;
    this.background = "transparent";
  }

}
