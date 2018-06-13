import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginsignupComponent } from '../loginsignup/loginsignup.component';

 @Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  public show: boolean = false;
  public show1: boolean = false;
  public show2: boolean = false;
  fcolor = 'transpaent';
  bntStyle: string;

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

  ngOnInit () {  }

  toggle() {
    this.show = !this.show;
    if (this.show) {
      this.show2 = false;
      this.show1 = false;
    }
    console.log(this.show);
    // CHANGE THE NAME OF THE BUTTON.
  }
  toggle1() {
    this.show1 = !this.show1;
    if (this.show1) {
      this.show2 = false;
      this.show = false;
    }
    console.log(this.show1);
    // CHANGE THE NAME OF THE BUTTON.
  }
  toggle2() {
    this.show2 = !this.show2;
    if (this.show2) {
      this.show = false;
      this.show1 = false;
    }
    console.log(this.show2);
    // CHANGE THE NAME OF THE BUTTON.
  }

  changeColor(val) {
    this.fcolor = val;
    console.log(this.fcolor);
  }

}
