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
    if(Object.keys(this.props.user).length > 0 ){
    this.props.loadEvents(eventId, this.props.user.access, this.props.user.user.spotifyUserId)
    }
  }

  render() {
    //playlist = this.props.playlist
    return (
      <div >
      <ul>

      </ul>
      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.user,
  playlist: state.playlist,
  // eventUser: state.eventUser
})

const mapDispatch = (dispatch) => ({
  loadEvents(eventId, token, spotifyUserId ) {
    dispatch(fetchPlaylist(eventId, token, spotifyUserId))
  }
  // handleSubmit(evt, eventId, userId, rsvp) {
  //   evt.preventDefault();
  //   dispatch(setRsvp(eventId, userId, rsvp))
  // }
})

export default connect(mapState, mapDispatch)(Playlist)

// {playlist.map((song)=>{
//   return(
//     <li>song.name</li>
//   )
// })}

