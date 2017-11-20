import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import { fetchPlaylist} from '../store';


class Playlist extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(props) {
    let eventId = this.props.match.params.eventId
    this.props.loadEvents(eventId)
  }

  render() {

    return (
      <div >
      <h1>hi</h1>

      </div>
    )
  }
}

const mapState = (state) => ({
  // user: state.user,
  // events: state.events,
  // eventUser: state.eventUser
})

const mapDispatch = (dispatch) => ({
  loadEvents(userId) {
    dispatch(fetchPlaylist(userId))
  }
  // handleSubmit(evt, eventId, userId, rsvp) {
  //   evt.preventDefault();
  //   dispatch(setRsvp(eventId, userId, rsvp))
  // }
})

export default connect(mapState, mapDispatch)(Playlist)

