import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { trigger, transition, animate, style } from '@angular/animations'

import { ComponentCommunicationService } from '../component-communication.service';
import { REQUEST_BASE_URL } from '../globals';

@Component({
  selector: 'app-area-rating',
  templateUrl: './area-rating.component.html',
  styleUrls: ['./area-rating.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('1000ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('1000ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class AreaRatingComponent implements OnInit {

  public pieChartLabels:string[] = ['GOOD', 'BAD'];
  public pieChartData:number[] = [];
  public pieChartType:string = 'pie';
  public pieChartColors:Array<any>;
  public pieChartOptions:any;

  barBackgroundColor: string = "#1e4372";
  areaRatingVariables: Object;
  showRatingDiv: Boolean = false;
  currentCoordinates : Object;
  locationContext : Object;
  location : String;
  locationId : String;
  iconForAction : String = "fa fa-angle-down";

  constructor( private componentCommunicationService: ComponentCommunicationService, private http: HttpClient ) { }

  ngOnInit() {
    this.init();
    this.componentCommunicationService.areaRatingComponentData.subscribe((data: string) => {
      if( data == 'true' ){
        this.init();
      }
    });
    this.pieChartColors = [
      { // green, red
        backgroundColor: [ 'rgb(76, 175, 80)', 'rgb(214,71,71)' ],
        borderColor: [ 'rgb(6,125,11)', 'rgb(152,13,13)' ],
        pointBackgroundColor: [ 'rgb(61,119,63)', 'rgb(138,7,7)' ],
        pointBorderColor: [ 'rgb(255,255,255)' ],
        pointHoverBackgroundColor: [ 'rgb(255,255,255)' ],
        pointHoverBorderColor: [ 'rgb(71,214,76)', 'rgb(181,59,8)' ]
      }
    ];
    this.pieChartOptions = {
      responsive: true
    };
  }

  init(){
    let indexOfBackgroundColor = {
      "locality" : "#b5375f",
      "city" : "#8e5220",
      "state" : "#4d99be",
      "country" : "#dd7518",
      "world" : "#71911d"
    };

    this.locationContext = JSON.parse(localStorage.getItem("locationContext"));
    this.currentCoordinates = JSON.parse(localStorage.getItem("currentCoordinates"));
    this.barBackgroundColor = indexOfBackgroundColor[ this.locationContext['type'] ];
    this.getAreaRatings( this.currentCoordinates, this.locationContext['type'] );
    if( this.locationContext['type'] != 'world' ){
      this.location = this.currentCoordinates[ this.locationContext['type'] ].toUpperCase();
    } else {
      this.location = this.locationContext['type'].toUpperCase();
    }
  }

  getAreaRatings( coordinates, level ){
    let indexOfLevelWiseResponseKeys = {
      'locality' : {
        "returnKey" : "localities",
        "returnId" : "locality_id"
      },
      'city' : {
        "returnKey" : "cities",
        "returnId" : "city_id"
      },
      'state' : {
        "returnKey" : "states",
        "returnId" : "state_id"
      },
      'country' : {
        "returnKey" :"countries",
        "returnId" : "country_id"
      }
    };
    if( !level )
      return false;
    let baseAPI = REQUEST_BASE_URL + 'location/get';
    let getURI = '?level=' + level;
    for( var key in coordinates ){
      if( key != 'countryShortName' ){
        getURI = getURI + '&' + key + '=' + encodeURIComponent( coordinates[ key ] );
      } else {
        getURI = getURI + '&country_code=' + encodeURIComponent( coordinates[ key ] );
      }
    }
    baseAPI = baseAPI + getURI;
    this.http.get( baseAPI ).subscribe(
      response => {
        if( Object.keys( response['data'] ).length > 0 ){
          if( level != 'world' ){
            let returnKey = indexOfLevelWiseResponseKeys[ level ]['returnKey'];
            let returnId = indexOfLevelWiseResponseKeys[ level ]['returnId'];
            let location: any = response['data']['location'];
            this.locationId = location[ returnKey ][ 0 ][ returnId ];
          } else if( level == 'world' ) {
            this.locationId = "0";
          }
          this.areaRatingVariables = response['data']['areaRating'];
          this.pieChartData = [];
          this.pieChartData.push( this.areaRatingVariables['goodPercent'] );
          this.pieChartData.push( this.areaRatingVariables['badPercent'] );
          if( !this.areaRatingVariables['userStatus'] ){
            this.showRatingDiv = true;
          }
        }
      }
    );
  }

  areaRate( rating : String ){
    if( this.locationContext['type'] && this.locationId && ( rating == 'good' || rating == 'bad' ) ){
      let dataToSend = {
      	"areaLevel": this.locationContext['type'],
      	"areaLevelId": this.locationId,
      	"rating" : rating
      };
      this.http.post( REQUEST_BASE_URL + 'area/rate', dataToSend ).subscribe(
        response => {
          if( response['error'] == 0 ){
            this.getAreaRatings( this.currentCoordinates, this.locationContext['type'] );
          }
        }
      );
    }
  }

  toggleAreaRatings(){
    this.showRatingDiv = !this.showRatingDiv;
    if( this.showRatingDiv ){
      this.iconForAction = "fa fa-angle-up";
    } else {
      this.iconForAction = "fa fa-angle-down";
    }
  }
}
