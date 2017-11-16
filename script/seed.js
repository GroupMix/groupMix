/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {
  User,
  Event,
  Playlist,
  Song,
  PlaylistSong,
  EventUser} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({name: 'Chris', email: 'chris@email.com', password: '123'}),
    User.create({name: 'Jesse', email: 'jesse@email.com', password: '123'}),
    User.create({name: 'Steve', email: 'steve@email.com', password: '123'}),
    User.create({name: 'Max', email: 'max@email.com', password: '123'})
  ])

  const events = await Promise.all([
    Event.create({name: 'Going Away Party', date: '11/5/17', time: '8:00pm', address: '123 FSA st', city: 'Chicago', state: 'IL', type: 'party', genres: ['rap', 'electronic'], hasEnded: true, montageURL: 'http://foo.com'}),
    Event.create({name: 'Chill Kickback', date: '11/6/17', time: '6:00pm', address: '456 FSA st', city: 'Chicago', state: 'IL', type: 'chill out', genres: ['downtempo', 'hip-hop'], hasEnded: true, montageURL: 'http://foo.com'}),
    Event.create({name: 'Dinner Event', date: '11/7/17', time: '7:00pm', address: '789 FSA st', city: 'Chicago', state: 'IL', type: 'dinner', genres: ['jazz', 'soul'], hasEnded: false, montageURL: 'http://foo.com'}),
    Event.create({name: 'Finals Study Sesh', date: '11/8/17', time: '4:00pm', address: '111 FSA st', city: 'Chicago', state: 'IL', type: 'study session', genres: ['electronic'], hasEnded: false, montageURL: 'http://foo.com'}),
  ])

  const eventUsers = await Promise.all([
    EventUser.create({userId: 1, eventId: 1, isHost: true, isAttending: true, atEvent: true}),
    EventUser.create({userId: 2, eventId: 1, isHost: false, isAttending: true, atEvent: false}),
    EventUser.create({userId: 3, eventId: 1, isHost: false, isAttending: true, atEvent: false}),
    EventUser.create({userId: 4, eventId: 1, isHost: false, isAttending: false, atEvent: false}),

    EventUser.create({userId: 1, eventId: 2, isHost: false, isAttending: false, atEvent: false}),
    EventUser.create({userId: 2, eventId: 2, isHost: true, isAttending: true, atEvent: true}),
    EventUser.create({userId: 3, eventId: 2, isHost: false, isAttending: true, atEvent: false}),
    EventUser.create({userId: 4, eventId: 2, isHost: false, isAttending: true, atEvent: false}),

    EventUser.create({userId: 1, eventId: 3, isHost: false, isAttending: true, atEvent: false}),
    EventUser.create({userId: 2, eventId: 3, isHost: false, isAttending: false, atEvent: false}),
    EventUser.create({userId: 3, eventId: 3, isHost: true, isAttending: true, atEvent: true}),
    EventUser.create({userId: 4, eventId: 3, isHost: false, isAttending: true, atEvent: false}),

    EventUser.create({userId: 1, eventId: 4, isHost: false, isAttending: true, atEvent: false}),
    EventUser.create({userId: 2, eventId: 4, isHost: false, isAttending: true, atEvent: true}),
    EventUser.create({userId: 3, eventId: 4, isHost: false, isAttending: false, atEvent: false}),
    EventUser.create({userId: 4, eventId: 4, isHost: true, isAttending: true, atEvent: true}),
  ])

  // const playlists = await Promise.all([

  // ])

  // const songs = await Promise.all([

  // ])

  // const playlistSongs = await Promise.all([

  // ])

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${events.length} events`)
  console.log(`seeded ${eventUsers.length} eventUsers`)
  // console.log(`seeded ${playlists.length} playlists`)
  // console.log(`seeded ${songs.length} songs`)
  // console.log(`seeded ${playlistSongs.length} playlistSongs`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
