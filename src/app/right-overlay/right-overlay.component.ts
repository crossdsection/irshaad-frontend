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

  // Display Stack to maintain display order.
  displayStack: DisplayStackNode[] = [];
  dispayStackNodeCount: number = 0;
  isDisplayed: boolean = false;

  depth: number = -10;
  background: string = "transparent";
  currentComponentInvoked: any = "";
  invoked: any = null;
  invokedIndex: number = 0;

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
                if(this.displayStack.length == 0) {
                  this.isDisplayed = true;
                }
                console.log(this.displayStack);
                this.invoked = this.rightOverlayContent.createComponent(this.componentFactoryResolver.resolveComponentFactory(ProfileComponent));
                this.invoked.instance.mcph = param.mcph;
                this.invoked.instance.displayStackIndex = this.invokedIndex;
                this.invoked.instance.initUser();
              break;
            }
          break;
        }
      }
    });
  }

  showRightOverlay() {
    if(this.isDisplayed) {
      let displayStackNode: DisplayStackNode = new DisplayStackNode();
      displayStackNode.componentName = this.currentComponentInvoked;
      displayStackNode.component = this.invoked;
      displayStackNode.nodeIndex = this.invokedIndex++;

      this.displayStack.push(displayStackNode);
      $(this.invoked.instance.element).hide();
    }

    this.depth = 10;
    this.background = "#0000006e";
  }

  hideRightOverlay() {
    this.rightOverlayCommunicationService.removeFromRightOverlay(this.currentComponentInvoked, this.invokedIndex);
    // this.invoked.instance.destroy();

    if(this.displayStack.length != 0){
      let displayStackNode: DisplayStackNode = this.displayStack.pop();
      this.invoked = displayStackNode.component;
      this.currentComponentInvoked = displayStackNode.componentName;
      this.invokedIndex = displayStackNode.nodeIndex;

      console.log(this.displayStack);
      console.log(displayStackNode);

      $(this.invoked.instance.element).show();
    }
    else {
      this.isDisplayed = false;
      this.depth = -10;
      this.background = "transparent";
    }
  }

}

// Creating a Node for displayStack
class DisplayStackNode {
  public componentName: string;
  public component: string;
  public nodeIndex: number;
}
