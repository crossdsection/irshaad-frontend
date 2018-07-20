import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fav-location-tile',
  templateUrl: './fav-location-tile.component.html',
  styleUrls: ['./fav-location-tile.component.css']
})
export class FavLocationTileComponent implements OnInit {

  @Input() location: string;

  constructor() {
   }

  ngOnInit() {
  }

}
