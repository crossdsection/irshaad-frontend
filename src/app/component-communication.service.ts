import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentCommunicationService {

  // Location tab component
  private locationTabComponent = new BehaviorSubject<string>("[]");
  locationTabComponentData = this.locationTabComponent.asObservable();

  editLocationTabComponent(data) {
    this.locationTabComponent.next(data);
  }

  // Country Flag Display component
  private countryFlagDisplayComponent = new BehaviorSubject<string>("");
  countryFlagDisplayComponentData = this.countryFlagDisplayComponent.asObservable();

  editCountryFlagDisplayComponent(data) {
    this.countryFlagDisplayComponent.next(data);
  }

  // Change Login status in header profile icon tab
  private headerProfileIconComponent = new BehaviorSubject<string>("");
  headerProfileIconComponentData = this.headerProfileIconComponent.asObservable();

  editLoggedInStatus(status) {
    this.headerProfileIconComponent.next(status);
  }

  // Logout 
  userLogout() {
    localStorage.removeItem("auth_data");
  }

  constructor() { }
}
