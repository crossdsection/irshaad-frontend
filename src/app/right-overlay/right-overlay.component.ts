import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { RightOverlayCommunicationService } from '../services/right-overlay-communication.service';
import { ProfileComponent } from '../profile/profile.component';

import * as $ from 'jquery';
import { EnactDetailComponent } from '../enact-detail/enact-detail.component';

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
  visibility: string = "hidden";
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
            switch(param.className) {
              case "ProfileComponent":
                this.showRightOverlay();
                if(this.isDisplayed) {
                  let displayStackNode: DisplayStackNode = new DisplayStackNode();
                  displayStackNode.componentName = this.currentComponentInvoked;
                  displayStackNode.component = this.invoked;
                  displayStackNode.nodeIndex = this.invokedIndex++;

                  this.displayStack.push(displayStackNode);
                  $(this.invoked.instance.element).hide();
                }
                if(this.displayStack.length == 0) {
                  this.isDisplayed = true;
                }
                this.currentComponentInvoked = param.className;
                this.invoked = this.rightOverlayContent.createComponent(this.componentFactoryResolver.resolveComponentFactory(ProfileComponent));
                this.invoked.instance.mcph = param.mcph;
                this.invoked.instance.displayStackIndex = this.invokedIndex;
                this.invoked.instance.initUser();
              break;
              case "EnactDetailComponent":
                this.showRightOverlay();

                if(this.isDisplayed) {
                  let displayStackNode: DisplayStackNode = new DisplayStackNode();
                  displayStackNode.componentName = this.currentComponentInvoked;
                  displayStackNode.component = this.invoked;
                  displayStackNode.nodeIndex = this.invokedIndex++;

                  this.displayStack.push(displayStackNode);
                  $(this.invoked.instance.element).hide();
                }

                if(this.displayStack.length == 0) {
                  this.isDisplayed = true;
                }
                this.currentComponentInvoked = param.className;
                this.invoked = this.rightOverlayContent.createComponent(this.componentFactoryResolver.resolveComponentFactory(EnactDetailComponent));
                this.invoked.instance.mcph = param.mcph;
                this.invoked.instance.initPost();
                this.invoked.instance.displayStackIndex = this.invokedIndex;
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
    this.visibility = 'visible';
  }

  hideRightOverlay() {
    this.visibility = 'hidden';
    this.rightOverlayCommunicationService.removeFromRightOverlay(this.currentComponentInvoked, this.invokedIndex);
    // this.invoked.instance.destroy();

    if(this.displayStack.length != 0){
      let displayStackNode: DisplayStackNode = this.displayStack.pop();
      this.invoked = displayStackNode.component;
      this.currentComponentInvoked = displayStackNode.componentName;
      this.invokedIndex = displayStackNode.nodeIndex;

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
