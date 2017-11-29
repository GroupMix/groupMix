import axios from 'axios'
// import history from '../history'
import { browserHistory } from 'react-router'
import SpotifyWebApi from 'spotify-web-api-js'
const SpotifyApi = new SpotifyWebApi()
import { ERROR } from 'socket.io-parser';
import { errorState } from './errorHandler'
import { fetchPlaylistSongs, prioritizeSongs } from './playlistSongs'
import { addSongsThunk} from './songs'
import socket from '../socket'

// Helper Functions
const setSpotifyToken = () => {
  return axios.get('/api/spotifyPlaylist/refreshtoken')
    .then(res => res.data)
    .then(token => {
      SpotifyApi.setAccessToken(token)
    })
}

/* ACTION TYPES*/
const GET_SPOTIFY_PLAYLIST = 'GET_SPOTIFY_PLAYLIST'


/* INITIAL STATE */
const defaultSpotifyPlaylist = []

/* ACTION CREATORS */
const getPlaylist = spotifyPlaylist => ({ type: GET_SPOTIFY_PLAYLIST, spotifyPlaylist })

/* THUNK CREATORS */
export const fetchSpotifyPlaylist = (eventId) =>
  dispatch => {
    axios.get(`/api/events/playlist/${eventId}`)
      .then(res => dispatch(getPlaylist(res.data)))
      .catch(err => console.log(err))
  }

export const updateSpotifyPlaylist = (eventId, endParty) =>
  dispatch => {
    let newPlaylistData = {};
    let spotifyUserId;
    let spotifyPlaylistId;
    let tracksToAdd;

    return axios.put(`/api/spotifyPlaylist/getPrioritizedSongs/${eventId}`, { endParty })
      .then(res => res.data)
      .then(data => {
        newPlaylistData = data
        spotifyUserId = newPlaylistData.spotifyUserId
        spotifyPlaylistId = newPlaylistData.spotifyPlaylistId
        tracksToAdd = newPlaylistData.uriArr

        setSpotifyToken()
          .then(() => {
            return SpotifyApi.getPlaylistTracks(spotifyUserId, spotifyPlaylistId)
          })
          .then(playlistTracks => {
            return playlistTracks.items.map(item => item.track.uri)
          })
          .then(tracksToRemove => {
            return SpotifyApi.removeTracksFromPlaylist(spotifyUserId, spotifyPlaylistId, tracksToRemove)
          })
          .then(() => {
            return SpotifyApi.addTracksToPlaylist(spotifyUserId, newPlaylistData.spotifyPlaylistId, tracksToAdd)
          })
          .then(() => {
            console.log('Spotify Updated')
            dispatch(fetchPlaylistSongs(eventId))
          })
          .catch(err => console.log(err))
      })
  }

export const startSpotifyPlaylist = (spotifyUri) =>
  dispatch => {
    setSpotifyToken()
      .then(() => {
        SpotifyApi.getMyDevices()
          .then(data => {
            console.log(data, 'My devices')
            SpotifyApi.play({ 'device_id': data.devices[0].id, 'context_uri': spotifyUri })
          })
          .catch(err => {
            dispatch(errorState(new Error('Please Open Spotify on your device before trying to start your Playlist!')))
            dispatch(pollingCurrentSong(false))
            console.log(err)
          })
      })
      .catch(err => console.log(err, 'error'))
  }

  export const getTrackGenres = (data) => dispatch => {
    let songArtistIds = data.songs.map(song => song.artists[0].id)
    let nestedArtistIds = [];
console.log('getting track genres')
    while (songArtistIds.length) {
      nestedArtistIds.push(songArtistIds.splice(0, 50))
    }
    let genreCalls = [];

    nestedArtistIds.forEach(artistsIds => {
      genreCalls.push(SpotifyApi.getArtists(artistsIds))
    })

    Promise.all(genreCalls)
      .then(artistData => {
        let genres = [];
        artistData.forEach(collection => {
          collection.artists.forEach(artist => {
            genres.push(artist.genres)
          })
        })
        return genres
      })
      .then(genres => {
        console.log('GENRESSSSS', genres)
        getAudioFeatures(data, genres, dispatch)
      })
      .catch(err => console.log(err))
  }

  export const getAudioFeatures = ({ idArr, songs, eventId, userId }, genres, dispatch) =>  {
    let persistSongs = [];
    SpotifyApi.getAudioFeaturesForTracks(idArr)
      .then((data) => {

        songs.forEach((song, index) => {
          const meta = data.audio_features[index];

          let songData = {
            name: song.name,
            artist: song.artists[0].name,
            spotifyArtistId: song.artists[0].id,
            spotifySongId: song.id,
            danceability: meta.danceability,
            energy: meta.energy,
            loudness: meta.loudness,
            speechiness: meta.speechiness,
            acousticness: meta.acousticness,
            instrumentalness: meta.instrumentalness,
            valence: meta.valence,
            tempo: meta.tempo,
            popularity: song.popularity,
            genres: genres[index] || null,
            playlistId: eventId,
            userId: userId
          }

          persistSongs.push(songData);
        })

        return persistSongs;
      })
      .then((finalSongs) =>  {
        console.log('SONGSSSS PERSISTING', persistSongs)
        finalSongs.forEach( song =>  {
          dispatch(addSongsThunk(song))
          return finalSongs
        })
      })
      .catch(err => {
        console.error(err);
      })

  }
export const getSimilarSongs = (song, event, userId) =>
  dispatch => {
    const seedInfo = {
      limit: 5,
      seed_tracks: [song.spotifySongId],
      target_acousticness: event.acousticness,
      target_danceability: event.danceability,
      target_energy: event.energy,
      target_valence: event.valence,
      target_loudness: event.loudness
    }
    setSpotifyToken()
    .then(() => {
      console.log('seed info', seedInfo)
      return SpotifyApi.getRecommendations(seedInfo)
    })
    .then((similarSongs) => {
      console.log('SIMILAR', similarSongs)
      let songs = similarSongs.tracks
      let idArr = [];
      let uniqueSongs = [];
      songs.map(song => {
        if (idArr.indexOf(song.id) === -1) {
          idArr.push(song.id)
          uniqueSongs.push(song)
        }
      })
      let dataObj = {songs: songs, idArr: idArr, eventId: event.id, userId: userId}
      dispatch(getTrackGenres(dataObj))
    })
    .then( () => {
      console.log('PRIORITIZING')
      dispatch(prioritizeSongs(event.id))
    })
    .catch(err => {
      console.error(err)
    })

}
export const resumeSpotifyPlaylist = () =>
  dispatch => {
    let currentTrackUri;
    setSpotifyToken()
      .then(() => {
        return SpotifyApi.getMyCurrentPlayingTrack()
      })
      .then((playingSong) => {
        console.log('PLAYING SONGGG FOR RESUME', playingSong)
        currentTrackUri = playingSong.item.uri
        SpotifyApi.getMyDevices()
          .then(data => {
            console.log(data, 'My devices')
            SpotifyApi.play({ 'device_id': data.devices[0].id })
          })
          .catch(err => {
            dispatch(pollingCurrentSong(false))
            console.log(err)
          })
      })
      .catch(err => {
        dispatch(errorState(new Error('Please Open Spotify on your device before trying to start your Playlist!')))
        console.log(err, 'error')
      })
  }


export const pauseSpotifyPlaylist = () =>
  dispatch => {
    setSpotifyToken()
      .then(() => {
        return SpotifyApi.getMyDevices()
      })
      .then(data => {
        SpotifyApi.pause({ 'device_id': data.devices[0].id })
        dispatch(pollingCurrentSong(false))
      })
      .catch(err => console.error(err));
  }

let interval
export const pollingCurrentSong = (poll, eventId) =>
  dispatch => {
    let currentSongId;
    // console.log('polling')
    let error;
    if (poll) {
      interval = setInterval(() => {
        setSpotifyToken()
          .then(() => {
            return SpotifyApi.getMyCurrentPlayingTrack()
              .then(track => {
                // console.log('polling')
                console.log('CURRENT SONG', currentSongId)
                if (track.is_playing) {

                  if (track.item.id !== currentSongId) {
                    dispatch(updateSpotifyPlaylist(eventId))
                    currentSongId = track.item.id
                    dispatch(updateGuests(eventId))
                  }

                  axios.put(`/api/playlistSongs/markAsPlayed/${track.item.id}`)
                } else {
                  console.log('no song playing')
                  // dispatch(updateSpotifyPlaylist(eventId))
                  //   .then(() => {
                  // dispatch(startSpotifyPlaylist())
                  // })
                }
                dispatch(updateSpotifyPlaylist(eventId))
              })
          })
      }, 9000)
    }
    if (!poll) {
      console.log(interval, 'stopped pollling')
      clearInterval(interval)
    }
  }

export const updateGuests = (eventId) =>
  dispatch => {
    console.log('thunk updateGuests Emmited')
    socket.emit('/pollerSongChange', eventId)
  }
/* REDUCER */
export default function (state = defaultSpotifyPlaylist, action) {
  switch (action.type) {
    case GET_SPOTIFY_PLAYLIST:
      return action.spotifyPlaylist
    default:
      return state
  }
}
