const { Song, PlaylistSong, Playlist, Event, User, EventUser } = require('../db/models');
let coordsCache = {};

// let coordsCache = { '4': { lat: 41.8884713, long: -87.6355346 } };

//distance calculator function
function distance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = Math.PI * lat1 / 180
  var radlat2 = Math.PI * lat2 / 180
  var theta = lon1 - lon2
  var radtheta = Math.PI * theta / 180
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist)
  dist = dist * 180 / Math.PI
  dist = dist * 60 * 1.1515
  if (unit == "K") { dist = dist * 1.609344 }
  if (unit == "N") { dist = dist * 0.8684 }
  return dist
}

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('guestCoords', ((coords) => {
      console.log("coords", coords)
      //cache all coordinates
      let { lat, long, userIdForSocket } = coords
      let key = userIdForSocket
      coordsCache[key] = { lat, long }
      console.log("coords cache",coordsCache)
      console.log("sock IDDD",userIdForSocket)
      //find most recent Event for user from DB
      return User.findById(userIdForSocket)
        .then((user) => {
          return user.getEvents()
        })
        .then((events) => {
          let eventsObj = {}
          let dates = events.map((event) => {
            let myDate = Date.parse(event.date)
            eventsObj[myDate] = event.id
            return myDate
          })
          return eventsObj[Math.min.apply(null, dates)]
        })
        .then((upcomingEventId) => {
          return EventUser.findOne({ where: { eventId: upcomingEventId, isHost: true } })
        })
        .then((upcomingEvent) => {
          console.log("val", Object.keys(upcomingEvent).length > 0 && coordsCache.hasOwnProperty(upcomingEvent.userId))
          if (Object.keys(upcomingEvent).length > 0 && coordsCache.hasOwnProperty(upcomingEvent.userId)){
          let lat1 = coordsCache[upcomingEvent.userId.toString()].lat
          let lon1 = coordsCache[upcomingEvent.userId.toString()].long
          let lat2 = coordsCache[userIdForSocket.toString()].lat
          let lon2 = coordsCache[userIdForSocket.toString()].long
          let unit = 'N'
          let distanceBetween = distance(lat1, lon1, lat2, lon2, unit)
          console.log('distance between', distanceBetween)
          if(distanceBetween < 0.03 ) {
            EventUser.findOne({ where: { eventId: upcomingEvent.eventId, userId: userIdForSocket } })
            .then((userToCheckIn)=>{
              userToCheckIn.update({atEvent: true})
            })
            console.log('user has been checked in')
            socket.broadcast.emit(`userHere/${upcomingEvent.eventId}`, upcomingEvent.userId, upcomingEvent.eventId) 
          }
          }
        })
        .catch((err)=>{
          console.log("SOCKET ERROR", err)
        })
        
    }))


    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('hasArrived', () => {
      console.log(`${socket.id} has arrived`)
    })
  })
}
