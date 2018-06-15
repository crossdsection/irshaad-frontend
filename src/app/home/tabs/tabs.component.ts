import { Component, OnInit } from '@angular/core';
import { EnactModalComponent } from '../enact-modal/enact-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  fcolor = 'transparet';
  public govt: boolean = false;
  public news: boolean = false;
  public dashboard: boolean = false;

  constructor(private modal: NgbModal) { }

  enactModal() {
    this.modal.open(EnactModalComponent);
  }
  changeColor(val) {
    this.fcolor = val;
    console.log(this.fcolor);
        }
        ngOnInit () {  }
        
          toggle() {
            this.govt = !this.govt;
          if (this.govt) {
            this.dashboard = false;
            this.news = false;
          }
            console.log(this.govt);
          }

          toggle1() {
            this.news = !this.news;
            if (this.news) {
              this.dashboard = false;
              this.govt = false;
            }
            console.log(this.news);

          }
          toggle2() {
            this.dashboard = !this.dashboard;
            if (this.dashboard) {
              this.govt = false;
              this.news = false;
            }
            console.log(this.dashboard);

          }


}
