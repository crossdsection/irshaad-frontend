import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RightOverlayCommunicationService {

  constructor() { }

  private rightOverlayComponent = new BehaviorSubject<string>("");
  rightOverlayComponentData = this.rightOverlayComponent.asObservable();
  invokeRightOverlayWith(className: string, parameter) {
    let param: any = {
      action: "invoke",
      className: className,
      mcph: parameter
    };
    console.log("Right overlay service");
    console.log(param);
    this.rightOverlayComponent.next(JSON.stringify(param));
  }

  removeFromRightOverlay(className: string, index: number = -1) {
    let param: any = {
      action: "remove",
      className: className,
      index: index
    };
    this.rightOverlayComponent.next(JSON.stringify(param));
  }

  doAction(action: string, value: string = "") {
    let param: any = {
      action: action,
      value: value
    };
    this.rightOverlayComponent.next(JSON.stringify(param));
  }

}
