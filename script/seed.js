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
  const faker = require('faker')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({name: 'Rhonda', email: 'rhonda@email.com', password: '123'}),
    User.create({name: 'Ben', email: 'ben@email.com', password: '123'}),
    User.create({name: 'Collin', email: 'collin@email.com', password: '123'}),
    User.create({name: 'Connie', email: 'connie@email.com', password: '123'}),
    User.create({name: 'Jesse Barron', spotifyUserId: '1235276482', email: 'jessebarron1113@gmail.com', password: 'null'}),
  ])

  const events = await Promise.all([
    Event.create({name: 'Going Away Party', date: '11/5/17', time: '8:00pm', address: '123 FSA st', city: 'Chicago', state: 'IL', type: 'party', genres: ['rap', 'electronic'], hasEnded: true, montageURL: 'http://foo.com'}),
    Event.create({name: 'Chill Kickback', date: '11/6/17', time: '6:00pm', address: '456 FSA st', city: 'Chicago', state: 'IL', type: 'chill out', genres: ['downtempo', 'hip-hop'], hasEnded: true, montageURL: 'http://foo.com'}),
    Event.create({name: 'Dinner Event', date: '11/7/17', time: '7:00pm', address: '789 FSA st', city: 'Chicago', state: 'IL', type: 'dinner', genres: ['jazz', 'soul'], hasEnded: false, montageURL: 'http://foo.com'}),
    Event.create({name: 'Fullstack Social', date: '11/8/17', time: '4:00pm', address: '111 FSA st', city: 'Chicago', state: 'IL', type: 'study session', genres: ['electronic'], hasEnded: false, montageURL: 'http://foo.com'}),
    Event.create({name: 'Poker Night', date: '11/8/17', time: '4:00pm', address: '111 FSA st', city: 'Chicago', state: 'IL', type: 'study session', genres: ['electronic'], hasEnded: false, montageURL: 'http://foo.com'}),
    Event.create({name: 'Finals Study Sesh', date: '11/8/17', time: '4:00pm', address: '111 FSA st', city: 'Chicago', state: 'IL', type: 'study session', genres: ['electronic'], hasEnded: false, montageURL: 'http://foo.com'}),
    Event.create({name: 'Dance Party!', date: '11/8/17', time: '4:00pm', address: '111 FSA st', city: 'Chicago', state: 'IL', type: 'study session', genres: ['dance','deep-house','dancehall','afrobeat'], danceability: 0.9, loudness: 0.8, energy: 0.9, acousticness: 0.1, valence: 0.8, hasEnded: false, montageURL: 'http://foo.com'}),
    Event.create({name: 'Quiet Party', date: '11/8/17', time: '4:00pm', address: '111 FSA st', city: 'Chicago', state: 'IL', type: 'study session', genres: ['acoustic', 'alit-rock', 'classical','chill'], danceability: 0.2, loudness: 0.2, energy: 0.2, acousticness: 0.2, valence: 0.3, hasEnded: false, montageURL: 'http://foo.com'}),

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
    EventUser.create({userId: 5, eventId: 8, isHost: true, isAttending: true, atEvent: false}),
  ])

  const playlists = await Promise.all([
    Playlist.create({ eventId: 8, spotifyPlaylistId: '0HSub3KCzMArJr7VKxm1pW' })
  ])

  // const songs = await Promise.all([
  //   Song.create({ artist: 'A Tribe Called Quest', name: 'Can I Kick it?', spotifySongId: '7kpeL1x9j7uKgPx6rVz7D7', danceability: 0.3, energy: 0.4, loudness: 0.7, speechiness: 0.3, acousticness: 0.3, instrumentalness: 0.8, valence: 0.2, popularity: 1, tempo: 0.2 })
  // ])

  // const playlistSongs = await Promise.all([
  //   PlaylistSong.create({ playlistId: 1, songId: 1, priority: 10, requests: 0, userId: 5 })
  // ])

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${events.length} events`)
  console.log(`seeded ${eventUsers.length} eventUsers`)
  console.log(`seeded ${playlists.length} playlists`)
  //console.log(`seeded ${songs.length} songs`)
  //console.log(`seeded ${playlistSongs.length} playlistSongs`)
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
