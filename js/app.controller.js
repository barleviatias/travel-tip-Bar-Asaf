import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;


let clickedPos = {}

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

// That function add events listenrs
function addEventListenrs() {
    // My location button
    document.querySelector('.my-location-btn').addEventListener('click', renderMyLocation)
    // Go button on header
    document.querySelector('.search-container button').addEventListener('click', onGoToLocation)
    // Close modal button
    document.querySelector('.close-btn').addEventListener('click', toggleModal)
    // Add location button
    document.querySelector('.add-location-btn').addEventListener('click', addNewLocation)
}


// That function get pos and render on map
function renderLocationOnMap(lat, lng, address) {
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
function onCopyAddress(){
    function myFunction() {
        /* Get the text field */
        var copyText = document.getElementById("myInput");
      
        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */
      
        /* Copy the text inside the text field */
        document.execCommand("copy");
      
        /* Alert the copied text */
        alert("Copied the text: " + copyText.value);
      }
}
// That function get user input and add new location on map
function onAddNewLocation() {
    let address = document.querySelector('input[name="search-location"]').value
    if (address.includes(' '))
        address = address.split(' ').join('+')
    locService.getLocationByAddress(address).then(res => {
        locService.addLocation(res)
        // renderLocationsTable()
        renderLocationOnMap(res.location.lat, res.location.lng, res.addressName)
        document.querySelector('.location-title h2 span').innerText = res.addressName
    })
}

// That function open input modal and save clicked position by clicking map
function onClickMap(pos) {
    toggleModal()
    clickedPos = pos
}

// That function add new location by clicking add button 
function addNewLocation() {
    const txt = document.querySelector('input[name="location-name"]').value
    const newLocation = {
        name: txt,
        lat: clickedPos.lat,
        lng: clickedPos.lng
    }
    locService.addLocation(newLocation)
    renderLocationsTable()
}


// That function toggle the input modal
function toggleModal() {
    document.querySelector('.input-modal').classList.toggle('active')
    document.querySelector('.overlay').classList.toggle('active')
}

// That function render a locations table
function renderLocationsTable() {
    locService.getLocs().then(locations => {
        const strHtmls = locations.map(location => {
            return `   <div class="location-card">
            <h3>${location.name}</h3>
           <div class="card-btns">
                <button onclick="renderLocationOnMap(${location.lat},${location.lng},'${location.name}')" class="go-location-btn">Go</button>
                <button onclick="onDeleteLocation(${location.id}) class="delete-location-btn">Delete</button>
             </div>
         </div>`
        })
        // document.querySelector('.locations-table').innerHTML = strHtmls.join('')
        // document.querySelectorAll('.go-location-btn').forEach((el.) => console.log(el))
    })

}





