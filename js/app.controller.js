import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;

function onInit() {
    addEventListenrs();
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
            mapService.getMap().addListener("click", (mapsMouseEvent) => {
                onClickMap(mapsMouseEvent.latLng.toJSON())
            })
        })
        .catch(() => console.log('Error: cannot init map'));
}

function addEventListenrs() {
    // My location button
    document.querySelector('.my-location-btn').addEventListener('click', renderMyLocation)
    // Go button on header
    document.querySelector('.search-container button').addEventListener('click', onGoToLocation)
    // Add map event listener

        


    // // That function take address from user input, go to new location, add new location
    // document.querySelector('.btn-pan').addEventListener('click', (ev) => {

    // })
    // document.querySelector('.btn-add-marker').addEventListener('click', (ev) => {
    //     console.log('Adding a marker');
    //     mapService.addMarker({ lat: 35.6895, lng: 139.6917 });
    // })
    // document.querySelector('.btn-get-locs').addEventListener('click', (ev) => {
    //     locService.getLocs()
    //         .then(locs => {
    //             console.log('Locations:', locs)
    //             document.querySelector('.locs').innerText = JSON.stringify(locs)
    //         })

    // })
}


// That function get pos and render on map
function renderLocationOnMap(lat, lng,address) {
    mapService.panTo(lat, lng)
    mapService.addMarker({ lat: lat, lng: lng }, address)
}

// That function render my location
function renderMyLocation() {
    mapService.getPosition()
        .then(pos => {
            console.log(pos);
            const { latitude, longitude } = pos.coords
            renderLocationOnMap(latitude, longitude)
            document.querySelector('.location-title h1 span').innerText = 'My location'
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

// That function go to the searching location
function onGoToLocation() {
    let address = document.querySelector('input[name="search-location"]').value
    if (address.includes(' '))
        address = address.split(' ').join('+')
    locService.getLocationByAddress(address).then(res => {
        renderLocationOnMap(res.location.lat, res.location.lng, res.addressName)
        document.querySelector('.location-title h2 span').innerText = res.addressName
    })
}

// That function add new location on clicking map
function onClickMap(pos){
   console.log(pos)
}

    // That function render a locations table
    function renderLocationsTable() {
       locService.getLocs().then(res=> console.log(res))
    //     const strHtmls = locations.map(location=> {
    //         return `   <div class="location-card">
    //     <h3>${location.addressName}</h3>
    //     <div class="card-btns">
    //         <button onclick="renderLocationOnMap(this.dataset.location)" class="go-location-btn">Go</button>
    //         <button class="delete-location-btn">Delete</button>
    //     </div>
    // </div>`
    //     })
    //     document.querySelector('.locations-table').innerHTML = strHtmls.join('')
    //     document.querySelectorAll('go-location-btn').forEach((el) =>{
    //         el.addressName('click',(ev) =>{
               
    //         })
    //     })
    }

    // That function render



