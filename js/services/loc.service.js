// import { storageService } from './services/storage.service.js'

export const locService = {
    getLocs
}

const KEY='DBlocation'
var locs = [
    { name: 'Loc1', lat: 32.047104, lng: 34.832384 },
    { name: 'Loc2', lat: 32.047201, lng: 34.832581 }
]
var currLocation;

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}
function setCurrLocation(){

}
function creatLocation(){

}
function deleteLocation(id){

}


//TODO - Creat location func {id, name, lat, lng, weather, createdAt, updatedAt}


// add loCAL STORAGE
