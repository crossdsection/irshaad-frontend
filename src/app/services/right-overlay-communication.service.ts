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
    this.rightOverlayComponent.next(JSON.stringify(param));
  }

  removeFromRightOverlay(className: string) {
    let param: any = {
      action: "remove",
      className: className
    };
    this.rightOverlayComponent.next(JSON.stringify(param));
  }

}
