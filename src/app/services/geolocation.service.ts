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
			locality   : "",
			city       : "",
			state      : "",
			country    : "",
			countryShortName: "",
			level: ""
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

		for(let i: number = 0; i < addressComponent.length; i++) {
			let component = addressComponent[i];
			
			switch(component.types[0]) {
				case 'country' : locationResolved.country = component.long_name; locationResolved.countryShortName = component.short_name;
				locationResolved.level = (locationResolved.level > levelOrder.country) ? levelOrder.country : locationResolved.level;
				break;
				case 'administrative_area_level_1' : locationResolved.state = component.long_name;
				locationResolved.level = (locationResolved.level > levelOrder.state) ? levelOrder.state : locationResolved.level;
				break;
				case 'administrative_area_level_2' : locationResolved.city = component.long_name;
				locationResolved.level = (locationResolved.level > levelOrder.city) ? levelOrder.city : locationResolved.level;
				break;
				case 'locality' : locationResolved.locality = component.long_name;
				locationResolved.level = (locationResolved.level > levelOrder.locality) ? levelOrder.locality : locationResolved.level;
				break;
			}
		}
		locationResolved.level = levelOrderName[locationResolved.level];
		return locationResolved;
	}

}