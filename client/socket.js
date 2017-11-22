import io from 'socket.io-client'

const socket = io(window.location.origin)


function sendCoords(lat, long, accuracy){
  let coords = {
    lat,
    long,
    accuracy
  }
  socket.emit('guestCoords', coords);
}

function geo_success(position) {
  sendCoords(position.coords.latitude, position.coords.longitude, position.coords.accuracy);
}
function geo_error() {
  alert("Sorry, no position available.");
}
var geo_options = {
  enableHighAccuracy: true,
  maximumAge        : 30000,
  timeout           : 27000
};
//var wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);

// listen for incoming connections from client
socket.on('connect', () => {
  console.log('Connected!')

   //socket.emit('guestCoords', coords);

})


export default socket
