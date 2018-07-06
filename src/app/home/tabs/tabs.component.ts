import { Component, OnInit } from '@angular/core';
import { EnactModalComponent } from '../enact-modal/enact-modal.component';
import { LoginsignupComponent } from '../loginsignup/loginsignup.component';
import { UserdataService } from '../../services/userdata.service';
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

  public country : String;
  public state : String;
  public city : String;
  public locality : String;
  public loggedIn: boolean;

  constructor( private modal: NgbModal, private userService: UserdataService ) {
    this.loggedIn = false;
    let userInfo = this.userService.getUserInfo();
    if( userInfo ){
      this.loggedIn = true;
    }
  }

  enactModal() {
    if( this.loggedIn ){
      this.modal.open(EnactModalComponent);
    } else {
      this.modal.open(LoginsignupComponent);
    }
  }

  changeColor(val) {
    this.fcolor = val;
  }

  ngOnInit() {
    this.country = 'Country';
    this.state = 'State';
    this.city = 'City';
    this.locality = 'Locality';
    var userData = JSON.parse( localStorage.getItem('userData') );
    if( userData != null ){
      if( userData['locale'] !== undefined ){
        this.country = userData['locale']['countries'][0]['country_name'];
        this.state = userData['locale']['states'][0]['state_name'];
        this.city = userData['locale']['cities'][0]['city_name'];
        this.locality = userData['locale']['localities'][0]['locality_name'];
      }
    }
  }

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
      case 'dash' : {
        this.dashboard = !this.dashboard;
        this.govt = false;
        this.news = false;
        break;
      }
    }
  }

}
