import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Form, Grid, Header, Segment, Icon, List, Card } from 'semantic-ui-react'
import { fetchInvitedUsers, fetchEvent, fetchSpotifyPlaylist, isHost, updateSpotifyPlaylist, hasCheckedIn, checkUserIn, startSpotifyPlaylist, startEvent } from '../store'
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
  }

  componentWillMount() {
    this.getUserStatus(+this.props.eventId)
    this.props.fetchInitialData(this.props.eventId)
  }

  getUserStatus = (eventId) => {
    let hostStatus;
    isHost(eventId)
      .then(res => {
        hostStatus = res.data
        return hasCheckedIn(eventId)
      })
      .then(res => {
        this.setState({
          isHost: hostStatus,
          isCheckedIn: res.data
        })
      })
      .catch(err => console.log(err))
  }

  handleCheckin = (eventId, userId) => {
    checkUserIn(eventId)
      .then(user => {
        this.setState({ isCheckedIn: true })
        socket.emit('userArrived', eventId, user.id)
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

    const { user, eventId, guestlist, event, spotifyPlaylist, startParty, eventStatus } = this.props
    const { isHost, isCheckedIn } = this.state
    const { hasStarted } = event
    let spotifyUri = this.props.spotifyPlaylist.spotifyPlaylistUri;
    let spotifyUrl

    socket.on(`userHere/${eventId}`, (userId, eventId) => {
      console.log("RECEIVED EMITTER! eventID:", eventId, "userId", userId)
      if (isHost) {
        console.log('updating event', eventId)
        this.props.updatePlaylist(+eventId)
      }
    })
    // console.log(event, hasStarted, "Event Status")
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
            (isHost && !hasStarted) &&
            <Button style={{ backgroundColor: '#AF5090', color: 'white' }} onClick={() => startParty(spotifyUri, eventId, isHost)}>Start The Event!</Button>
          }
          {
            (isHost && hasStarted) && 
            <Button style={{ backgroundColor: '#AF5090', color: 'white' }} onClick={() => startParty(spotifyUri, eventId, isHost)}>Play</Button>
          }
          {
            (hasStarted && !isCheckedIn && !isHost) &&
            <Button style={{ backgroundColor: '#6A8CDF', color: 'white' }} onClick={() => this.handleCheckin(eventId, user.id)}>Check-in</Button>
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
    spotifyPlaylist: state.spotifyPlaylist,
    eventStatus: state.eventStatus
  }
}

const mapDispatch = (dispatch) => ({
  fetchInitialData(eventId) {
    dispatch(fetchInvitedUsers(eventId))
    dispatch(fetchEvent(eventId))
    dispatch(fetchSpotifyPlaylist(eventId))
    dispatch(updateSpotifyPlaylist(eventId))
  },
  startParty(spotifyUri, eventId, hostStat) {
    startSpotifyPlaylist(spotifyUri)
    dispatch(startEvent(eventId, hostStat))
  },
  updatePlaylist(eventId) {
    dispatch(updateSpotifyPlaylist(eventId))
  }
})

export default connect(mapState, mapDispatch)(PartyView)
