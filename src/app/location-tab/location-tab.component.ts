import { Component, OnInit, Input } from '@angular/core';

// Importing Services
import { ComponentCommunicationService } from '../component-communication.service';

@Component({
  selector: 'app-location-tab',
  templateUrl: './location-tab.component.html',
  styleUrls: ['./location-tab.component.css']
})
export class LocationTabComponent implements OnInit {

  country = "";
  state = "";
  city = "";
  locality = "";
  rwa = "RWA";

  constructor(private componentCommunicationService: ComponentCommunicationService) { }

  ngOnInit() {
    this.componentCommunicationService.locationTabComponentData.subscribe((data: any) => {
      this.country = data.country;
      this.state = data.state;
      this.city = data.city;
      this.locality = data.locality;
      this.rwa = "RWA";

      // Change Flag in country flag display component
      this.componentCommunicationService.editCountryFlagDisplayComponent(data.countryShortName);
    });
  }

}
