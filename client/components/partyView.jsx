import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
var SpotifyWebApi = require('spotify-web-api-js');
// import * as SpotifyWebApi from 'spotify-web-api-js'
var spotifyApi = new SpotifyWebApi();
import { Button, Form, Grid, Header, Segment, Icon, List, Card } from 'semantic-ui-react'
import { addSongsThunk, addPlaylistSongThunk, fetchInvitedUsers, fetchEvent, fetchSpotifyPlaylist, isHost, fetchPlaylist, updateSpotifyPlaylist, hasCheckedIn, checkUserIn } from '../store'
import GuestListItem from './guestListItem.jsx'
import history from '../history'
import socket from '../socket'
/**
 * COMPONENT
 */
class PartyView extends React.Component {
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
      spotifyUri: '',
      isHost: false,
      isCheckedIn: false,
    }
    // this.handleAdd = this.handleAdd.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
    // this.getTopArtistTracks = this.getTopArtistTracks.bind(this)
    // this.getTrackGenres = this.getTrackGenres.bind(this)
    // this.getAudioFeatures = this.getAudioFeatures.bind(this)
  }

  componentWillMount() {
    this.props.fetchInitialData(this.props.eventId)
    // spotifyApi.setAccessToken(this.props.user.access)
    this.getUserStatus(this.props.eventId)
  }

  getUserStatus = (eventId) => {
    let hostStatus;
    isHost(eventId)
      .then(hostStat => {
        hostStatus = hostStat
        return hasCheckedIn(eventId)
      })
      .then(guestStat => {
        console.log(guesStat.data)
        this.setState({
          isCheckedIn: guestStat.data,
          isHost: hostStatus.data
        })
      })
  }
  
  handleCheckin = (eventId, userId) => {
    console.log(userId)
    checkUserIn(eventId)
    .then(user => {
      this.setState({ isCheckedIn: true })
      socket.emit('emmited', eventId, user.id)
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

    const { email, user, eventId, guestlist, event, spotifyPlaylist, startParty } = this.props
    const { isHost, isCheckedIn } = this.state
    // let spotifyUser;
    let spotifyUri = this.props.spotifyPlaylist.spotifyPlaylistUri;
    let spotifyUrl;

    socket.on(`userHere/${eventId}`, (userId, eventId) => {
      if (isHost) {
        startParty(+eventId, user.access, user.user.spotifyUserId)
      }
    })
    // this.setState({spotifyUri: spotifyUri})
    spotifyUri ? spotifyUrl = spotifyUri.replace(/:/g, '/').substr(8) : spotifyUri = spotifyUri + '';
    // console.log('EVENTTT', this.props.event)
    // console.log('GUESTLISTTTTT', this.props.guestlist)
    // console.log('SPOTIFY PLAYLIST', spotifyUrl)
    // let attending = invitedUsers.some(invitedUser => invitedUser.id === user.id)
    return (
      <div>
        <br />
        <Segment inverted style={{ marginTop: '-.75em', marginBottom: '-.7em' }}>
          <Header as="h2" inverted color="purple" textAlign="center"  >Enjoy the {event.name}!</Header>
          {
            isHost &&
            <div>
              <Button style={{ backgroundColor: '#AF5090', color: 'white' }} onClick={() => startParty(eventId, user.access, user.user.spotifyUserId)}>Start The Event!</Button>
            </div>
          }
          {
            isCheckedIn &&
            <Button style={{ backgroundColor: '#6A8CDF', color: 'white' }} onClick={() => this.handleCheckin(eventId, user.id) }>Check-in</Button>
          }
        </Segment>
        <Segment inverted>
          <Grid
            divided
            textAlign="left"
            columns={2}
            padded
            inverted

          >
            <Grid.Column floated="left" >
              <Header as="h2" color="blue" textAlign="center">
                Guestlist
        </Header>
              <Card.Group
                itemsPerRow={3}
              >
                {
                  guestlist.length ?
                    guestlist.map(guest => {
                      return (
                        <GuestListItem key={guest.id} user={guest} eventId={eventId} />
                      )
                    })
                    : <h1>No one Has Arrived</h1>
                }
              </Card.Group>


            </Grid.Column>

            <Grid.Column  >
              <Header as="h2" color="blue" textAlign="center">
                Playlist
            </Header>
              {spotifyUrl &&
                <iframe src={`https://open.spotify.com/embed/${spotifyUrl}`} width="600" height="1000" frameBorder="0" allowtransparency="true"></iframe>}
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
    event: state.newEvent,
    spotifyPlaylist: state.spotifyPlaylist
  }
}

const mapDispatch = (dispatch) => ({
  fetchInitialData(eventId) {
    dispatch(fetchInvitedUsers(eventId))
    dispatch(fetchEvent(eventId))
    dispatch(fetchSpotifyPlaylist(eventId))
  },
  startParty(eventId, token, spotifyUserId) {
    dispatch(fetchPlaylist(eventId, token, spotifyUserId))
  }
})

export default connect(mapState, mapDispatch)(PartyView)

/**
 * PROP TYPES
 */
