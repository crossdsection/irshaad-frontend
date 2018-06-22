import { Component, OnInit } from '@angular/core';
import { EnactModalComponent } from '../enact-modal/enact-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { trigger, style, group, transition, state, animate, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
  animations: [
      trigger('slideInOut', [
          state('in', style({height: '*', opacity: 0})),
          transition(':leave', [
              style({height: '*', opacity: 1}),

              group([
                  animate(300, style({height: 0})),
                  animate('200ms ease-in-out', style({'opacity': '0'}))
              ])

          ]),
          transition(':enter', [
              style({height: '0', opacity: 0}),

              group([
                  animate(300, style({height: '*'})),
                  animate('400ms ease-in-out', style({'opacity': '1'}))
              ])

          ])
      ])
  ]
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

  toggleTabs( args ){
    switch( args ){
      case 'govt' : {
        this.govt = !this.govt;
        this.dashboard = false;
        this.news = false;
        break;
      }
      case 'news' : {
        this.news = !this.news;
        this.dashboard = false;
        this.govt = false;
        break;
      }
      case 'desk' : {
        this.dashboard = !this.dashboard;
        this.govt = false;
        this.news = false;
        break;
      }
    }
  }

}
