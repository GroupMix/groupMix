import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Segment, Button, Header } from 'semantic-ui-react';
import { fetchUserEvents, setRsvp, cancelEvent } from '../store';
import { Link } from 'react-router-dom'
import '../styles/_eventList.scss';

class EventList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(props) {
    this.props.loadEvents(this.props.user.id)
  }

  render() {
    const { events, user, handleSubmit, history, handleCancelEvent } = this.props
    const rsvpYes = true;
    const rsvpNo = false;
    return (
      <div className="event-list-container">
        <br />
        <Segment textAlign="center" inverted style={{ marginTop: 'inherit' }}>
          <Header as="h1" icon="list ul" content="Your Events" textAlign="center" />
        </Segment>

        <Segment className="invited-events" inverted>
          <Segment compact={true} inverted>
            <Header as="h2" content="Invitations" color="purple" style={{ marginLeft: '1em' }} />
          </Segment>
          <List divided inverted>
            {events &&
              events.map((event) => (
                (event.eventUser.isAttending === null && !event.hasEnded) &&
                <List.Item key={event.id}>
                  <Header as="h3" icon="sound" content={event.name} style={{ marginBottom: '1em' }} />
                  <List.Content>
                    <List.Header style={{ marginLeft: '3em' }}>
                      <Button
                        positive
                        onClick={evt => {
                          handleSubmit(evt, event.id, user.id, rsvpYes)
                          history.push(`/events/${event.id}`)
                        }}>Yes</Button>
                      <Button negative onClick={evt => handleSubmit(evt, event.id, user.id, rsvpNo)}>No</Button>
                    </List.Header>
                    <List.Description>
                      <List.List as="ul">
                        <List.Item as="li">Description: {event.type}</List.Item>
                        <List.Item as="li">Genres: {
                          event.genres.map(genre => (
                            `${genre.toUpperCase()} `
                          ))
                        }
                        </List.Item>
                        <List.Item as="li">Date: {event.date}</List.Item>
                      </List.List>
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))
            }
          </List>
        </Segment>

        <Segment className="hosted-events" inverted>
          <Segment compact={true} inverted>
            <Header as="h2" content="Hosted Events" color="purple" style={{ marginLeft: '1em' }} />
          </Segment>
          <List divided inverted>
            {events &&
              events.map((event) => (
                (event.eventUser.isHost && !event.hasEnded) &&
                <List.Item key={event.id}>
                  <Header as="h3" icon="sound" content={event.name} style={{ marginBottom: '1em' }} />
                  <List.Content floated="left">
                    <List.Header style={{ marginLeft: '3em' }}>
                      <Button color="green" onClick={() => history.push(`/${event.id}/users/invite`)}>Invite Users</Button>
                      <Button negative onClick={() => handleCancelEvent(event.id, user.id)}>Cancel Event</Button>
                      <Button color="blue" onClick={() => history.push(`/events/${event.id}`)}>Set Music Preferences</Button>
                      <Button color="teal" onClick={() => history.push(`/events/${event.id}/partyview`)}>Party View</Button>
                    </List.Header>
                    <List.Description>
                      <List.List as="ul">
                        <List.Item as="li">Description: {event.type}</List.Item>
                        <List.Item as="li">Genres: {
                          event.genres.map(genre => (
                            `${genre.toUpperCase()} `
                          ))
                        }
                        </List.Item>
                        <List.Item as="li">Date: {event.date}</List.Item>
                      </List.List>
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))
            }
          </List>
        </Segment>

        <Segment className="upcoming-events" inverted>
          <Segment compact={true} inverted>
            <Header as="h2" content="Upcoming Events" color="purple" style={{ marginLeft: '1em' }} />
          </Segment>
          <List divided inverted>
            {events &&
              events.map((event) => (
                (event.eventUser.isAttending && !event.eventUser.isHost && !event.hasEnded) &&
                <List.Item key={event.id}>
                  <Header as="h3" icon="sound" content={event.name} style={{ marginBottom: '1em' }} />
                  <List.Content floated="left">
                    <List.Header style={{ marginLeft: '3em' }}>
                      <Button color="blue" onClick={() => history.push(`/events/${event.id}`)}>Set Music Preferences</Button>
                      <Button color="purple" onClick={() => history.push(`/events/${event.id}/partyview`)}>Party View</Button>
                    </List.Header>
                    <List.Description>
                      <List.List as="ul">
                        <List.Item as="li">Description: {event.type}</List.Item>
                        <List.Item as="li">Genres: {
                          event.genres.map(genre => (
                            `${genre.toUpperCase()} `
                          ))
                        }
                        </List.Item>
                        <List.Item as="li">Date: {event.date}</List.Item>
                      </List.List>
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))
            }
          </List>
        </Segment>

        <Segment className="past-events" inverted>
          <Segment compact={true} inverted>
            <Header as="h1" content="Past Events" color="purple" style={{ marginLeft: '1em' }} />
          </Segment>
          <List divided inverted>
            {events &&
              events.map((event) => (
                (event.eventUser.isAttending && event.hasEnded) &&
                <List.Item key={event.id}>
                  <Header as="h3" icon="sound" content={event.name} style={{ marginBottom: '1em' }} />
                  <List.Content floated="left">
                    <a href={event.playlistURL} target="#blank"><Button content="View Spotify Playlist" style={{backgroundColor: '#4BA7B8', color: '#FFFFFF'}} /></a>
                    <List.Description>
                      <List.List as="ul">
                        <List.Item as="li">Description: {event.type}</List.Item>
                        <List.Item as="li">Genres: {
                          event.genres.map(genre => (
                            `${genre.toUpperCase()} `
                          ))
                        }
                        </List.Item>
                        <List.Item as="li">Date: {event.date}</List.Item>
                      </List.List>
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))
            }
          </List>
        </Segment>

      </div>
    )
  }
}

const mapState = (state) => ({
  user: state.user,
  events: state.events,
  eventUser: state.eventUser
})

const mapDispatch = (dispatch, ownProps) => ({
  loadEvents(userId) {
    dispatch(fetchUserEvents(userId))
  },
  handleSubmit(evt, eventId, userId, rsvp) {
    evt.preventDefault();
    dispatch(setRsvp(eventId, userId, rsvp))
  },
  handleCancelEvent(eventId, userId) {
    dispatch(cancelEvent(eventId, userId))
  }
})

export default connect(mapState, mapDispatch)(EventList)
