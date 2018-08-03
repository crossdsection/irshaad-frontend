import { Component, OnInit, Input } from '@angular/core';
import { REQUEST_BASE_URL } from '../globals';

@Component({
  selector: 'app-user-summary-tile',
  templateUrl: './user-summary-tile.component.html',
  styleUrls: ['./user-summary-tile.component.css']
})
export class UserSummaryTileComponent implements OnInit {

  @Input() user: any = [];
  requestBaseUrl :string = "http://backend.worldvoting.org/";
  userLocation: string = "";

  constructor() { }

  ngOnInit() {
    if(this.user.address != null) {
      console.log("address");
      console.log(this.user.address);
      let split_arr: any[] = this.user.address.split(",");
      console.log(split_arr);
      this.userLocation = split_arr[split_arr.length - 2] + ", " + split_arr[split_arr.length - 1];
      console.log(this.userLocation);
    }
  }

}
