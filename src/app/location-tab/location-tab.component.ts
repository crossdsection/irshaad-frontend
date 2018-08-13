import { Component, OnInit, Input, ElementRef } from '@angular/core';

// Importing Services
import { ComponentCommunicationService } from '../component-communication.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-location-tab',
  templateUrl: './location-tab.component.html',
  styleUrls: ['./location-tab.component.css']
})
export class LocationTabComponent implements OnInit {

  private element: any;

  country = "Country";
  state = "State";
  city = "City";
  locality = "Locality";
  rwa = "RWA";

  constructor(private componentCommunicationService: ComponentCommunicationService, private elementRef: ElementRef) {
    this.element = this.elementRef.nativeElement;
   }

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

    // Setting scroll fixed.
    var distance = $(this.element).offset().top, $window = $(window);
    distance = 160;

    $window.scroll(function() {
        if ( $window.scrollTop() >= distance ) {
          // Your div has reached the top
          $("#divToBeFixed").css({
            "position": "fixed",
            "top": "0px",
            "left": "0px",
            "width": "100%",
            "z-index": "9"
          });
        }
        else {
          $("#divToBeFixed").css({
            "position": "initial",
            "top": "initial",
            "left": "initial",
            "width": "initial",
            "z-index": "initial"
          });
        }
    });
    // End Setting scroll fixed.
  }

  changeLocationContextType(value: string) {
    let locationContext: any = JSON.parse(localStorage.getItem("locationContext"));
    locationContext.type = value;
    localStorage.setItem("locationContext", JSON.stringify(locationContext));

    this.componentCommunicationService.editBreadcrumbBarLocationContext();
    this.componentCommunicationService.editAreaRatingLocationContext();
  }

}
