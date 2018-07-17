import { Component, OnInit } from '@angular/core';

// Importing Services
import { ComponentCommunicationService } from '../component-communication.service';

@Component({
  selector: 'app-country-flag-display',
  templateUrl: './country-flag-display.component.html',
  styleUrls: ['./country-flag-display.component.css']
})
export class CountryFlagDisplayComponent implements OnInit {

  countryFlagSource = "";

  constructor(private componentCommunicationService: ComponentCommunicationService) { }

  ngOnInit() {
    this.componentCommunicationService.countryFlagDisplayComponentData.subscribe(data => {
      this.countryFlagSource = 'https://www.countryflags.io/' + data + '/flat/64.png';
    });
  }

}
