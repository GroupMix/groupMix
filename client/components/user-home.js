import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
var SpotifyWebApi = require('spotify-web-api-js');
// import * as SpotifyWebApi from 'spotify-web-api-js'
var spotifyApi = new SpotifyWebApi();
import { Button, Form, Grid, Header, Segment, Icon, List } from 'semantic-ui-react'
import addSongsThunk from '../store'
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
    let data = this.getTopArtistTracks();
    // this.getTrackGenres(data)
    // this.getAudioFeatures(data);
  }

  getTopArtistTracks = () => {
    // console.log('SELECTED ARTISTS', this.state.selected)

    let topArtistSongs = []

    // this.state.selected.map(artist =>
    // spotifyApi.getArtistTopTracks(artist.id, 'US')
    //   .then((data) => {
    //     topArtistSongs = [... topArtistSongs, ...data.tracks ]
    //   })
    // .catch(err => {
    //   console.error(err);
    // }))

    this.state.selected.forEach(artist => {
      spotifyApi.getArtistTopTracks(artist.id, 'US')
        .then((data) => {
          data.tracks.forEach(track =>{
            topArtistSongs.push(track)
          })
        })
        .catch(err => {
          console.error(err);
        })})

    console.log(topArtistSongs, "faksghdflkajdshfs")

    let songs = topArtistSongs;
    console.log(songs, "songs[0]")
    console.log(songs[0]);
    let idArr = songs.map(song => song.id)
    // console.log(idArr, "idArr")

    this.setState({ songs: songs, topArtistSongs: topArtistSongs, idArr: idArr })
    // return { songs: songs, topArtistSongs: topArtistSongs, idArr: idArr }
  }

  getTrackGenres = (data) => {

    console.log('DATA', data)

    let songArtistIds = data.songs.map(song => song.artists[0].id)
    let genres = [];
    // this.setState({ artistIds: [...this.state.artistIds, ...songArtistIds] })

    spotifyApi.getArtists(songArtistIds)
      .then(artistData => {
        console.log(artistData.artists)
        genres.push(...artistData.artists.genres)
      })
      .catch(err => console.log(err))
    console.log(genres, "Artists genres")

    // (err, data) => {
    //   if (err) console.log(err)
    //   data.artists.forEach(artist =>
    //     data
    //     // this.setState({ genres: [...this.state.genres, artist.genres]}))
    // })
    // console.log(this.state.genres, "genres")
  }

  getAudioFeatures = () => {
    spotifyApi.getAudioFeaturesForTracks(this.state.idArr)
      .then((data) => {
        console.log('AUDIO FEATURE DATA', data);

        this.state.songs.forEach((song, index) => {
          const meta = song.audio_features[index];
          let songData = {
            name: song.name,
            artist: song.artists[0].name,
            artistId: song.artists[0].id,
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
            genres: this.state.genres[index]
          }
          this.setState({ songsData: [...this.state.songsData, songData] })
        })
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
    // console.log('SONGS', this.state.songs)

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
const mapState = (state) => {
  return {
    user: state.user,
    email: state.user.user.email
  }
}

const mapDispatch = (dispatch) => {
  return {
    userSongs(songs) {
      dispatch(addSongsThunk(songs))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
