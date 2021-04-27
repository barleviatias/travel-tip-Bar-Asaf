
export const utilesService = {
	getFromStorage,
	saveToStorage,
    makeId
}

function getFromStorage(key) {
	return JSON.parse(localStorage.getItem(key));
}

function saveToStorage(key, val) {
	localStorage.setItem(key, JSON.stringify(val));
}
function makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}