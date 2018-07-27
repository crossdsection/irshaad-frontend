import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentService {

  private popups:  any[] = [];

  constructor() { }

  /* Modal Part */
  addPopup(popup: any) {
    // add popups to array of active popups
    this.popups.push(popup);
  }

  // Open the popup
  openPopup(id: string) {
    let popup: any = this.popups.filter(x => x.id === id)[0];
    popup.openPopup();
  }

  // Close the popup
  closePopup(id: string) {
    let popup: any = this.popups.filter(x => x.id === id)[0];
    popup.closePopup();
  }
}
