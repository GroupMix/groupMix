module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on(`emmited`, (eventId, userId) => {
      console.log( "Message button emmited from event", eventId, userId)
      socket.broadcast.emit(`userHere/${eventId}`, userId, eventId)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
