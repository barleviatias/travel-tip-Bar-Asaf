import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;

function onInit() {
    addEventListenrs();
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
}

function addEventListenrs() {
    // My location button
    document.querySelector('.my-location-btn').addEventListener('click', renderMyLocation)
    // Go button on header
    document.querySelector('.search-container button').addEventListener('click', onAddNewLocation)
  

    // That function take address from user input, go to new location, add new location
    document.querySelector('.btn-pan').addEventListener('click', (ev) => {
      
    })
    document.querySelector('.btn-add-marker').addEventListener('click', (ev) => {
        console.log('Adding a marker');
        mapService.addMarker({ lat: 35.6895, lng:  139.6917 });
    })
    document.querySelector('.btn-get-locs').addEventListener('click', (ev) => {
        locService.getLocs()
            .then(locs => {
                console.log('Locations:', locs)
                document.querySelector('.locs').innerText = JSON.stringify(locs)
            })

    })
}


// That function get pos and render on map
function renderLocationOnMap(lat,lng){
    mapService.panTo(lat,lng)
    mapService.addMarker({lat: lat,lng: lng},'My Location')
}

// That function render my location
function renderMyLocation(){
    mapService.getPosition()
    .then(pos => {
        const {latitude,longitude} = pos.coords
        renderLocationOnMap(latitude,longitude)
    })
    .catch(err => {
        console.log('err!!!', err);
    })
}

// That function get user input and add new location on map
function onAddNewLocation(){
    let address = document.querySelector('input[name="search-location"]').value
    if(address.includes(' '))
    address = address.split(' ').join('+')
    // const prm=locService.getLocationByAddress(address)
    locService.getLocationByAddress(address).then(res=>renderLocationOnMap(res.location.lat,res.location.lng))
    
    // console.log(prm)
}


