import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
  })
export class GeolocationService {

	constructor() {}

	private isFunction(functionToCheck) {
		return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
	}

	resolveLocation(locationComponent: any) {
		let locationResolved : any = {
			latitude   : 0,
			longitude  : 0,
			locality   : "-",
			city       : "-",
			state      : "-",
			country    : "-",
			countryShortName: "-",
			level: "-"
		};

		let levelOrder: any = {
			locality: 0,
			city: 1,
			state: 2,
			country: 3
		}
		let levelOrderName = ["locality", "city", "state", "country"];

		locationResolved.level = levelOrder.country;

		if(!this.isFunction(locationComponent.geometry.location.lat)) {
			// Not a function
			locationResolved.latitude = locationComponent.geometry.location.lat;
			locationResolved.longitude = locationComponent.geometry.location.lng;
		}
		else {
			// Is a function
			locationResolved.latitude = locationComponent.geometry.location.lat();
			locationResolved.longitude = locationComponent.geometry.location.lng();
		}

		let addressComponent = locationComponent.address_components;
		let levelTypeKeys = {
			'country' : [ 'country' ],
			'state' : [ 'administrative_area_level_1' ],
			'city' : [ 'locality', 'administrative_area_level_2' ],
			'locality' : [ 'route', 'sublocality', 'neighborhood', 'sublocality_level_1', 'locality' ]
		};

		for( var i in addressComponent ){
			let component = addressComponent[ i ];
			for( var level in  levelTypeKeys ){
				let intersectArray = levelTypeKeys[ level ].filter( value => -1 !== component['types'].indexOf(value) );
				if( intersectArray.length > 0 && locationResolved[ level ] == '-' ){
					locationResolved.level = (locationResolved.level > levelOrder[level]) ? levelOrder[level] : locationResolved.level;
					locationResolved[ level ] = component.long_name;
					if( level == 'country' ){
						locationResolved[ 'countryShortName' ] = component.short_name;
					}
				}
			}
		}
		locationResolved.level = levelOrderName[ locationResolved.level ];
		return locationResolved;
	}

	isUserLoggedIn() {
		let auth_data = JSON.parse(localStorage.getItem('auth_data'));
		return !(auth_data == null);
	}

}
