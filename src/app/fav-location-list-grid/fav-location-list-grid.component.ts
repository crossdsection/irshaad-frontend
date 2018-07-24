import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { REQUEST_BASE_URL } from '../globals';

@Component({
  selector: 'app-fav-location-list-grid',
  templateUrl: './fav-location-list-grid.component.html',
  styleUrls: ['./fav-location-list-grid.component.css']
})
export class FavLocationListGridComponent implements OnInit {

  favLocationData: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getFavLocations();
  }

  getFavLocations() {
    this.http.get(REQUEST_BASE_URL + 'favlocation/get').subscribe((response: any) => {
      this.favLocationData = response.data;
      console.log(this.favLocationData);
    },
  error => {
    // Do something
  });
  }

}
