import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
var SpotifyWebApi = require('spotify-web-api-js');
// import * as SpotifyWebApi from 'spotify-web-api-js'
var spotifyApi = new SpotifyWebApi();
import { Button, Form, Grid, Header, Segment, Icon, List } from 'semantic-ui-react'
import { addSongsThunk, addPlaylistSongThunk } from '../store'
/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recentTracks: [],
      topTracks: [],
      topArtists: [],
      selected: [],
      songs: [],
      songsData: [],
      genres: [],
      topArtistSongs: [],
      idArr: [],
      artistIds: [],
    }
    this.handleAdd = this.handleAdd.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getTopArtistTracks = this.getTopArtistTracks.bind(this)
    this.getTrackGenres = this.getTrackGenres.bind(this)
    this.getAudioFeatures = this.getAudioFeatures.bind(this)
  }

  componentDidMount() {
    spotifyApi.setAccessToken(this.props.user.access)

    spotifyApi.getMyRecentlyPlayedTracks()
      .then(data => {
        let recent = data.items.map(item => item.track)
        this.setState({ recentTracks: recent })
      })
      .catch(err => {
        console.error(err);
      })

    spotifyApi.getMyTopTracks()
      .then(data => {
        this.setState({ topTracks: data.items })
      })
      .catch(err => {
        console.error(err);
      })

    spotifyApi.getMyTopArtists()
      .then((data) => {
        this.setState({ topArtists: data.items })
      })
      .catch(err => {
        console.error(err);
      })
  }

  handleAdd(evt, data) {
    this.setState({ selected: [data.content, ...this.state.selected] })
  }
  handleSubmit() {
    this.getTopArtistTracks();
  }

  getTopArtistTracks = () => {
    let artistsTopTracks = [];
    this.state.selected.forEach(artist => {
      artistsTopTracks.push(spotifyApi.getArtistTopTracks(artist.id, 'US'))
    })

    Promise.all(artistsTopTracks)
      .then(topTracks => {
        console.log(topTracks, "top tracks")

        let topArtistSongs = [];

        topTracks.forEach(collection => {
          topArtistSongs = [...collection.tracks, ...topArtistSongs]
        })

        let songs = [...topArtistSongs, ...this.state.topTracks, ...this.state.recentTracks]

        let idArr = [];
        let uniqueSongs = [];
        songs.map(song => {
          if (idArr.indexOf(song.id) === -1){
          idArr.push(song.id)
          uniqueSongs.push(song)
          }
        })
        console.log('SONGSSSSSSSSS', uniqueSongs.length)
        console.log('IDDDDDDSSSSS', idArr.length)
        return { songs: uniqueSongs, idArr: idArr }
      })
      .then((data) => {
        this.getTrackGenres(data);
        // this.getAudioFeatures(data);
      })
  }

  getTrackGenres = (data) => {
    // console.log('SONGS IN GET TRACK GENRES', data.songs);
    // console.log('DATA', data)

    let songArtistIds = data.songs.map(song => song.artists[0].id)
    let nestedArtistIds = [];
    while (songArtistIds.length) {
      console.log(songArtistIds.length)
      nestedArtistIds.push(songArtistIds.splice(0, 50))
    }
    console.log('NESTED ARTIST IDS', nestedArtistIds)

    let genreCalls = [];

    nestedArtistIds.forEach(artistsIds => {
      genreCalls.push(spotifyApi.getArtists(artistsIds))
    })

    Promise.all(genreCalls)
      .then(artistData => {
        console.log('ARTIST DATA', artistData);
        let genres = [];

        artistData.forEach(collection => {
          collection.artists.forEach(artist => {
            genres.push(artist.genres)
          })
        })

        console.log('GENRES', genres)
        return genres
      })
      .then(genres => {
        this.getAudioFeatures(data, genres)
      })
      .catch(err => console.log(err))
  }

  getAudioFeatures = ({ idArr, songs }, genres) => {
    // console.log('ID ARR IN AUDIO FEATURES', idArr)
    // console.log('SONGS IN AUDIO FEATURES', songs)
    spotifyApi.getAudioFeaturesForTracks(idArr)
      .then((data) => {
        // console.log('AUDIO FEATURE DATA', data);
        // console.log('SONGS !!!!!', songs);

        let persistSongs = [];
        let persistPlaylistSongs = [];

        console.log('GENRES IN AUDIO FEAT', genres)
        songs.forEach((song, index) => {
          const meta = data.audio_features[index];

          // let playlistSong = {
          //   playlistId: this.props.eventId,
          //   songId: song.id,
          //   priority: 0,
          //   userId: this.props.user.id
          // }

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
            playlistId: this.props.eventId,
            userId: this.props.user.id
          }

          persistSongs.push(songData);
          // persistPlaylistSongs.push(playlistSong);
          // this.props.userSongs(song);
          this.setState({ songsData: [...this.state.songsData, songData] })
        })
        return {persistSongs: persistSongs, persistPlaylistSongs: persistPlaylistSongs};
      })
      .then(({persistSongs, persistPlaylistSongs}) => {
        persistSongs.forEach(song => {
          this.props.userSongs(song);
        })
        // persistPlaylistSongs.forEach(song => {
        //   this.props.playListSong(song);
        // })
      })
      .catch(err => {
        console.error(err);
      })
  }

  render() {
    // console.log('songsData', this.state.songsData)
    // console.log('ARTISTS TOP TRACKS', this.state.topArtistSongs);
    // console.log('ALL SONGS', this.state.songs);
    // console.log('ID ARR', this.state.idArr)
    // console.log('TOP ARTIST SONGS ON STATE', this.state.topArtistSongs)
    // console.log('SONGS DATA FINALLY', this.state.songsData)
    // console.log('ARTIST GENRES', this.state.genres)
    console.log('ROUTE PARAMS', this.props.eventId)

    const { email, user } = this.props

    return (
      <div>
        <h3>Welcome, {email}</h3>
        <Grid
          divided
          textAlign="left"
          columns={2}

        >
          <Grid.Column  >
            <Header as="h2" color="blue" textAlign="center">
              Event Name
        </Header>
          </Grid.Column>

          <Grid.Column  >
            <Header as="h2" color="blue" textAlign="center">
              Top Artists
            <Button onClick={this.handleSubmit} color="blue" floated="right">
                Submit Artists
            </Button>
            </Header>
            <List >
              {this.state.topArtists &&
                this.state.topArtists.map(item => {
                  return (
                    <List.Item key={item.id}>
                      <List.Content floated="right">
                        <Button onClick={this.handleAdd} color="purple" disabled={this.state.selected.includes(item)} content={item}>
                          <Icon name="add" color="white" />
                          Add
              </Button>
                      </List.Content>
                      <Icon name="music" color="blue" />
                      <List.Content>
                        {item.name}
                      </List.Content>
                    </List.Item>)
                })
              }
            </List>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
  return {
    user: state.user,
    email: state.user.user.email,
    eventId: ownProps.match.params.eventId
  }
}

const mapDispatch = (dispatch) => ({
    userSongs(songs) {
      dispatch(addSongsThunk(songs))
    },
    playListSong(song) {
      dispatch(addPlaylistSongThunk(song))
    }
})

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
