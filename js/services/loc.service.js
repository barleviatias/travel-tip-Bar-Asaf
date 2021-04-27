export const locService = {
	getLocs,
	addLocation,
	deleteLocation,
	getLocationByAddress,
};

import {utilesService } from './utiles.service.js';
const KEY = 'DBlocation';
const API_KEY = 'AIzaSyAfvktGRnTPT-aq4CfjmM3zi1jWHxqojY4'; //TODO: Enter your API Key
var locs=[];
let id = 1;
var currLocation;
function getLocs() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(locs);
		}, 2000);
	});
}
function addLocation(res) {
    if(utilesService.getFromStorage(KEY)){
        locs = utilesService.getFromStorage(KEY)
        id=locs.length-1
    }

	locs.push({
		id: utilesService.makeId(),
		addressName: res.addressName,
		lat: res.location.lat,
		lng: res.location.lng,
		createdAt: Date.now(),
	});
	
    console.log('locs',locs);
	utilesService.saveToStorage(KEY, locs);
}
function deleteLocation(id) {
	loc.splice(id, 1);
	utilesService.saveToStorage(KEY, locs);
}

function getLocationByAddress(address) {
	return axios
		.get(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`
		)
		.then((res) => {
			const loc = res.data.results[0];
			return {
				addressName: loc.formatted_address,
				location: loc.geometry.location,
			};
		})
		.catch((err) => console.log(err));
}


