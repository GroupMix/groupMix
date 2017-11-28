import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Form, Grid, Header, Segment, Icon, List, Card, Modal } from 'semantic-ui-react'
import {
  fetchInvitedUsers,
  fetchEvent,
  fetchSpotifyPlaylist,
  isHost,
  updateSpotifyPlaylist,
  hasCheckedIn,
  checkUserIn,
  startSpotifyPlaylist,
  startEvent,
  endEvent,
  deletePlaylistSongs,
  pollingCurrentSong,
  pauseSpotifyPlaylist,
  resumeSpotifyPlaylist,
  fetchPlaylistSongs,
  prioritizeSongs
} from '../store'

import _ from 'lodash'
import GuestListItem from './guestListItem.jsx'
import EndEventModal from './endEventModal'
import ErrorModal from './errorModal'
import PlaylistQueue from './playlistQueue'
import history from '../history'
import socket from '../socket'
import EventSettings from './eventSettings';

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
      editModalShowing: false,
      showEndEventModal: false,
      currentTrackUri: '',
      isPlaying: false,
      isDirty: false
    }
  }

  componentWillMount() {
    this.getUserStatus(+this.props.eventId)
    this.props.fetchInitialData(this.props.eventId)
  }

  componentWillUnmount() {
    this.props.polling(false)
  }


  getUserStatus = (eventId) => {
    const { polling } = this.props
    let hostStatus;
    let hasStarted
    isHost(eventId)
      .then(res => {
        hostStatus = res.data.isHost
        hasStarted = res.data.hasStarted
        if (hostStatus && hasStarted) {
          polling(true, eventId)
        }
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

  handleModal = (evt) => {
    evt.preventDefault();
    this.state.editModalShowing ? this.setState({ editModalShowing: false}) : this.setState({ editModalShowing: true })
  }

  handleEndEvent = (endedEvent) => {
    if (endedEvent) {
      console.log(this.props.eventId)
      this.props.endEvent(this.props.eventId, true, this.props.user.id)
    } else {
      this.setState({ showEndEventModal: false })
    }
  }
  handlePlayback = (eventId) => {
    if (this.state.isPlaying){
      this.props.pausePlaylist()
      this.setState({ isPlaying: false })
    }
    if (!this.state.isPlaying){
      this.props.resumePlaylist(eventId)
      this.setState({ isPlaying: true })
    }
  }

  render() {
    const { user, eventId, guestlist, event, spotifyPlaylist, startParty, eventStatus, pausePlaylist, resumePlaylist, playlistSongs} = this.props
    const { isHost, isCheckedIn, isPlaying, currentTrackUri } = this.state
    const { hasStarted } = event

    let spotifyUri = this.props.spotifyPlaylist.spotifyPlaylistUri;
    let spotifyUrl
    spotifyUri ? spotifyUrl = spotifyUri.replace(/:/g, '/').substr(8) : spotifyUri = spotifyUri + '';
   
    let playbackButton;
    isPlaying ? playbackButton = 'Pause' : playbackButton = 'Resume'

    socket.on(`userHere/${eventId}`, (userId, eventId) => {
      console.log("RECEIVED EMITTER! eventID:", eventId, "userId", userId)
      this.props.socketUpdates(eventId)
      if (isHost) {
        console.log('updating event', eventId)
        this.props.runUpdates(eventId)
      } else {
        _.debounce(this.props.socketUpdates(eventId), 30000)
      }
    })
    socket.on(`/songChange/${eventId}`, (eventId) => {
      if (!isHost) {
        _.debounce(this.props.socketUpdates(eventId), 30000)
      }
    })

    return (
      <div>
        <br />
        <Segment inverted style={{ marginTop: '-.75em', marginBottom: '-.7em' }}>
          <Header as="h2" inverted color="purple" textAlign="center"  >Enjoy the {event.name}!</Header>
          <Segment inverted>
          {
            (isHost && !hasStarted) &&
            <Button style={{ backgroundColor: '#AF5090', color: 'white' }} onClick={() => {
              startParty(spotifyUri, eventId, isHost)
              this.setState({ isPlaying: true })}}>
              Start The Event!
              </Button>
          }
          {
            (isHost && hasStarted) &&
            <div>

              <Button style={{ backgroundColor: '#AF5090', color: 'white' }} onClick={() => this.handlePlayback(eventId)}>{playbackButton}</Button>
              <Button onClick={() => this.setState({ showEndEventModal: !this.state.showEndEventModal })}> End Event </Button>
              <ErrorModal />
              <Modal open={this.state.showEndEventModal} closeOnDimmerClick={true}>
                <EndEventModal endEvent={this.handleEndEvent} />
              </Modal>
            </div>
          }
          </Segment>
          <Segment inverted>
          {
            (hasStarted && !isCheckedIn && !isHost) &&
            <Button style={{ backgroundColor: '#6A8CDF', color: 'white' }} onClick={() => this.handleCheckin(eventId, user.id)}>Check-in</Button>
          }
          </Segment>
          <Segment inverted>
            {
              isHost &&
              <div>
              <Button onClick={(evt) => this.handleModal(evt)}>Edit Event Settings</Button>
                <Modal open={this.state.editModalShowing}>
                  <Modal.Header>Event Settings</Modal.Header>
                  <Modal.Content >
                    <EventSettings
                    event={event}
                    handleModal={this.handleModal}
                    />
                  </Modal.Content>
                </Modal>
                </div>
            }
          </Segment>
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
                  guestlist.length >= 1 ?
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
              {
                spotifyUrl &&
                <iframe src={`https://open.spotify.com/embed/${spotifyUrl}`} width="600" height="100" frameBorder="0" allowtransparency="true"></iframe>
              }
              <PlaylistQueue songs={playlistSongs} eventId={eventId} />
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
    eventStatus: state.eventStatus,
    playlistSongs: state.playlistSongs
  }
}

const mapDispatch = (dispatch, ownProps) => ({
  fetchInitialData(eventId) {
    dispatch(fetchInvitedUsers(eventId))
    dispatch(fetchEvent(eventId))
    dispatch(fetchSpotifyPlaylist(eventId))
    dispatch(fetchPlaylistSongs(eventId))
    dispatch(updateSpotifyPlaylist(eventId))

  },
  socketUpdates(eventId){
    console.log("FETCH SONGS AFTER SOCKET")
    dispatch(fetchPlaylistSongs(eventId))
    dispatch(fetchInvitedUsers(eventId))
  },
  startParty(spotifyUri, eventId, hostStat) {
    dispatch(startSpotifyPlaylist(spotifyUri))
    dispatch(startEvent(eventId, hostStat))
    dispatch(pollingCurrentSong(true, eventId))
  },
  resumePlaylist(eventId) {
    dispatch(resumeSpotifyPlaylist())
    dispatch(pollingCurrentSong(true, eventId))
  },
  pausePlaylist() {
    dispatch(pauseSpotifyPlaylist())
  },
  prioritize(eventId) {
    dispatch(prioritizeSongs(eventId))
  },
  updatePlaylist(eventId) {
    dispatch(updateSpotifyPlaylist(eventId))
    dispatch(fetchPlaylistSongs(eventId))
  },
  runUpdates(eventId){
    dispatch(getPriority(eventId))
    .then(()=>{
      dispatch(fetchInvitedUsers(eventId))
      dispatch(fetchEvent(eventId))
      dispatch(fetchSpotifyPlaylist(eventId))
      dispatch(updateSpotifyPlaylist(eventId))
      dispatch(fetchPlaylistSongs(eventId))
    })
    .then(()=>{
      this.props.updatePlaylist(+eventId)
    })
  }
,
  endEvent(eventId, end) {
    dispatch(updateSpotifyPlaylist(eventId, end))
      .then(event => {
        dispatch(deletePlaylistSongs(eventId))
        dispatch(endEvent(eventId))
      })
    ownProps.history.push('/eventList/')
  },
  polling(poll, eventId) {
    dispatch(pollingCurrentSong(poll, eventId))
  },
  getPriority(eventId){
    dispatch(prioritizeSongs(eventId))
  }
})

export default connect(mapState, mapDispatch)(PartyView)
