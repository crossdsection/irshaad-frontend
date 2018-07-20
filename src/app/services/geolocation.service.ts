import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
  })
export class GeolocationService {

	constructor() {}

	resolveLocation(locationComponent: any) {
		console.log(locationComponent);
		let locationResolved : any = {
			latitude   : 0,
			longitude  : 0,
			locality   : "",
			city       : "",
			state      : "",
			country    : ""
		};

		locationResolved.latitude = locationComponent.geometry.location.lat();
		locationResolved.longitude = locationComponent.geometry.location.lng();

		let addressComponent = locationComponent.address_components;

		for(let i: number = 0; i < addressComponent.length; i++) {
			let component = addressComponent[i];
			
			switch(component.types[0]) {
				case 'country' : locationResolved.country = component.long_name;
				break;
				case 'administrative_area_level_1' : locationResolved.state = component.long_name;
				break;
				case 'administrative_area_level_2' : locationResolved.city = component.long_name;
				break;
				case 'locality' : locationResolved.locality = component.long_name;
				break;
			}
		}
		return locationResolved;
	}

}