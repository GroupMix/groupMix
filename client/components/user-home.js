import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
var SpotifyWebApi = require('spotify-web-api-js');
// import * as SpotifyWebApi from 'spotify-web-api-js'
var spotifyApi = new SpotifyWebApi();

import { Button, Form, Grid, Header, Segment, Icon, List, Card } from 'semantic-ui-react'
import { addSongsThunk, addPlaylistSongThunk, fetchInvitedUsers, fetchEvent, prioritizeSongs, getTrackGenres, setSpotifyToken, getAudioFeatures } from '../store'
import GuestListItem from './guestListItem.jsx'
import history from '../history'

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
    // this.getTrackGenres = this.getTrackGenres.bind(this)
    // this.getAudioFeatures = this.getAudioFeatures.bind(this)
    this.getInfoAndPersist = this.getInfoAndPersist.bind(this)
  }

  componentDidMount() {
    spotifyApi.setAccessToken(this.props.user.access)
    this.props.fetchInitialData(this.props.eventId)

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

    setSpotifyToken()
    spotifyApi.getMyTopArtists()
      .then((data) => {
        this.setState({ topArtists: data.items })
      })
      .catch(err => {
        console.error(err);
      })
  }
  //will run this on component did mount for Chris' component
  componentWillUnmount() {
    this.props.prioritize(this.props.match.params.eventId * 1)
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

        let topArtistSongs = [];

        topTracks.forEach(collection => {
          topArtistSongs = [...collection.tracks, ...topArtistSongs]
        })

        let songs = [...topArtistSongs, ...this.state.topTracks, ...this.state.recentTracks]

        let idArr = [];
        let uniqueSongs = [];
        songs.map(song => {
          if (idArr.indexOf(song.id) === -1) {
            idArr.push(song.id)
            uniqueSongs.push(song)
          }
        })
        return { songs: uniqueSongs, idArr: idArr, eventId: this.props.eventId, userId: this.props.user.id }
      })
      .then((data) => {
        this.getInfoAndPersist(data);
      })
  }

  getInfoAndPersist = (data) => {
    console.log("PERSIST data", data)
    this.props.getTrackInfo(data)
    setTimeout(() => {
    history.push(`/events/${this.props.eventId}/partyview`)
    }, 100)
  }


  render() {
    const { email, user, eventId, guestlist, event } = this.props
    return (
      <div>
        <br />
        <Segment inverted style={{ marginTop: '-.75em', marginBottom: '-.7em' }}>
          <Header as="h2" inverted color="purple" textAlign="center"  >Get ready for the {event.name}!</Header>
        </Segment>
        <Segment inverted>
          <Grid
            divided
            textAlign="left"
            columns={2}
          >

            <Grid.Column width={11}>
              <Header as="h2" color="blue" textAlign="center">
                Guestlist
              </Header>
              <Card.Group itemsPerRow={4}>
                {
                  guestlist.length ?
                    guestlist.map(guest => {
                      return (
                        <GuestListItem key={guest.id} user={guest} eventId={eventId} />
                      )
                    })
                    : <h1>No one Has been Invited</h1>
                }
              </Card.Group>
            </Grid.Column>

            <Grid.Column width={5}>
              <Header as="h2" color="blue" textAlign="center" float="left">
                Top Artists
                <Button onClick={this.handleSubmit} color="blue" floated="right" style={{ marginRight: '0.25em' }}>
                  Submit
                </Button>
              </Header>

              <List divided inverted relaxed>
                {this.state.topArtists &&
                  this.state.topArtists.map(item => {
                    return (
                      <List.Item key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
                        <Icon name="music" color="blue" size="large" />
                        <List.Content floated="left" style={{ width: '-webkit-fill-available' }} >
                          {item.name}
                        </List.Content>
                        <div inverted style={{ width: '-webkit-fill-available', verticalAlign: 'middle' }}>
                          <List.Content floated="right">
                            <Button onClick={this.handleAdd} color="purple" disabled={this.state.selected.includes(item)} content={item}>
                              <Icon name="add" color="white" />
                              Add
                            </Button>
                          </List.Content>
                        </div>
                      </List.Item>)
                  })
                }
              </List>
            </Grid.Column>
          </Grid>
        </Segment>
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
    eventId: ownProps.match.params.eventId,
    guestlist: state.invitedUsers,
    event: state.newEvent
  }
}


const mapDispatch = (dispatch) => ({
  userSongs(songs) {
    dispatch(addSongsThunk(songs))
  },
  playListSong(song) {
    dispatch(addPlaylistSongThunk(song))
  },
  fetchInitialData(eventId) {
    dispatch(fetchInvitedUsers(eventId))
    dispatch(fetchEvent(eventId))
  },
  prioritize(eventId) {
    dispatch(prioritizeSongs(eventId))
  },
  getTrackInfo(data) {
    dispatch(getTrackGenres(data))
  }
})

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
