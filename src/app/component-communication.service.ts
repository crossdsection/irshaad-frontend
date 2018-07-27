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

  // Country Flag Display component
  private breadcrumbBarComponent = new BehaviorSubject<string>("");
  breadcrumbBarComponentData = this.breadcrumbBarComponent.asObservable();
  editBreadcrumbBarLocationContext() {
    this.breadcrumbBarComponent.next("true");
  }

  // Change Login status in header profile icon tab
  private headerProfileIconComponent = new BehaviorSubject<string>("");
  headerProfileIconComponentData = this.headerProfileIconComponent.asObservable();

  editLoggedInStatus(status) {
    this.headerProfileIconComponent.next(status);
  }

  // Toggle Change Location Component
  private changeLocationComponent = new BehaviorSubject<string>("");
  changeLocationComponentData = this.changeLocationComponent.asObservable();

  editChangeLocationComponentDisplay() {
    this.changeLocationComponent.next("");
  }

  editChangeLocationComponentMapLatLng(latitude: any, longitude: any) {
    let parameters = {
      action: "setLatLng",
      latitude: latitude,
      longitude: longitude,
    };
    this.changeLocationComponent.next(JSON.stringify(parameters));
  }

  // Toggle Change Location Component
  private favLocationListGridComponent = new BehaviorSubject<string>("");
  favLocationListGridComponentData = this.favLocationListGridComponent.asObservable();

  editFavLocationListGridComponentDisplay() {
    this.favLocationListGridComponent.next("true");
  }

  // Logout 
  userLogout() {
    localStorage.removeItem("auth_data");
  }

  // Current Location Change Trigger.
  private currentLocation = new BehaviorSubject<string>("");
  currentLocationData = this.currentLocation.asObservable();

  setCurrentLocation() {
    this.currentLocation.next("true");
  }

  constructor() { }
}
