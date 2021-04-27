export const mapService = {
	initMap,
	addMarker,
	panTo,
	getPosition,
	getMap
};

var gMap;
var gMarker

function initMap(lat = 32.6381922, lng = 35.093855) {
	console.log('InitMap');
	return _connectGoogleApi().then(() => {
		console.log('google available');
		gMap = new google.maps.Map(document.querySelector('#map'), {
			center: { lat, lng },
			zoom: 15,
		});
		console.log('Map!', gMap);
	});
}

function getMap(){
	if(gMap) return gMap
}


function addMarker(loc, title) {
	gMarker = new google.maps.Marker({
		position: loc,
		title,
	});

    const contentString =
    `<div id="content"> 
    <div id="siteNotice"> 
    </div> 
    <h1 id="firstHeading" class="firstHeading">${title}</h1> 
    <div id="bodyContent">
    </div> 
    </div>`;
	const infowindow = new google.maps.InfoWindow({
		content: contentString,
	});
	gMarker.addListener('click', () => {
		infowindow.open(map, gMarker);
	});
	gMarker.setMap(gMap)
}

function panTo(lat, lng) {
	var laLatLng = new google.maps.LatLng(lat, lng);
	gMap.panTo(laLatLng);
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
	console.log('Getting Pos');
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
}

function _connectGoogleApi() {
	if (window.google) return Promise.resolve();
	const API_KEY = 'AIzaSyAfvktGRnTPT-aq4CfjmM3zi1jWHxqojY4'; //TODO: Enter your API Key
	var elGoogleApi = document.createElement('script');
	elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
	elGoogleApi.async = true;
	document.body.append(elGoogleApi);

	return new Promise((resolve, reject) => {
		elGoogleApi.onload = resolve;
		elGoogleApi.onerror = () => reject('Google script failed to load');
	});
}
