export const locService = {
	getLocs,
	creatLocation,
	deleteLocation,
    getLocationByAddress
};

import { storageService } from '../services/storage.service.js';
const KEY = 'DBlocation';
const API_KEY = 'AIzaSyAfvktGRnTPT-aq4CfjmM3zi1jWHxqojY4'; //TODO: Enter your API Key
var locs;
var currLocation;

function getLocs() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(locs);
		}, 2000);
	});
}
function setCurrLocation() {}
function creatLocation(name, lat, lng) {
	locs = storageService.getFromStorage(KEY);
	if (!locs) {
		locs.push({ name, lat, lng });
		storageService.saveToStorage(KEY, locs);
	}
}
function deleteLocation(id) {
	loc.splice(id, 1);
	storageService.saveToStorage(KEY, locs);
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
	// prm.then(res=>console.log(res))
}

//TODO - Creat location func {id, name, lat, lng, weather, createdAt, updatedAt}

// add loCAL STORAGE
