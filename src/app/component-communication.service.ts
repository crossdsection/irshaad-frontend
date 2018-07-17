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

  constructor() { }
}
