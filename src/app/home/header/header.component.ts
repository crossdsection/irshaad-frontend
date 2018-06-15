import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginsignupComponent } from '../loginsignup/loginsignup.component';
import { EnactModalComponent } from '../enact-modal/enact-modal.component';

 @Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
 
  public govt: boolean = false;
  public news: boolean = false;
  public dashboard: boolean = false;

  fcolor = 'transparet';

  constructor(private modal: NgbModal) { }


  HeaderComponent() {
    this.bntStyle = 'btn-default';
  }
  submit() {
    this.bntStyle = 'btn-change';
  }
  onClick() {
    this.modal.open(LoginsignupComponent, { size: 'lg', backdrop: 'static',windowClass:'animated slideInUp'});
  }
  enactModal() {
     this.modal.open(EnactModalComponent);
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



  changeColor(val) {
    this.fcolor = val;
    console.log(this.fcolor);
  }

}
