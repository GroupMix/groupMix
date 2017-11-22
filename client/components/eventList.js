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
      <Segment textAlign="center" inverted style={{ marginTop: 'inherit'}}>
      <Header as="h1" icon="list ul" content="Your Events" textAlign="center"  />
</Segment>
        <Segment className="invited-events" inverted>
          <Segment compact={true} inverted>
          <Header as="h2" content="Invitations" color="purple" />

          </Segment>
          <List divided inverted>
            {events &&
              events.map((event) => (
                (event.eventUser.isAttending === null && !event.hasEnded) &&
                <List.Item key={event.id}>
                <Header as="h3" icon="sound" content={event.name} />
                  <List.Content floated="left">
                    <Button positive onClick={evt => handleSubmit(evt, event.id, user.id, rsvpYes)}>Yes</Button>
                    <Button negative onClick={evt => handleSubmit(evt, event.id, user.id, rsvpNo)}>No</Button>
                  </List.Content>
                  <List.Content>
                    <List.Header>
                      {event.name}
                    </List.Header>
                    <List.Description className="event-description">
                      <List.List as="ul">
                        <div className="type-container">
                          <List.Item as="li">Type: {event.type}</List.Item>
                          <List.Item as="li">Genres: {
                            event.genres.map(genre => (
                              `${genre}, `
                            ))
                          }
                          </List.Item>
                        </div>
                        <List.Item as="li">
                          <List.Content>Date & Time: {event.date} at {event.time}</List.Content>
                        </List.Item>
                        <div className="location-container">
                          <List.Item as="li">Address: {event.address}</List.Item>
                          <List.Item as="li">City: {event.city}</List.Item>
                          <List.Item as="li">State: {event.state}</List.Item>
                        </div>
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
          <Header as="h2" content="Hosted Events" color="purple" />
          </Segment>
          <List divided inverted>
            {events &&
              events.map((event) => (
                (event.eventUser.isHost && !event.hasEnded) &&
                <List.Item key={event.id}>
                  <Header as="h3" icon="sound" content={event.name} />

                  <List.Content floated="left">
                    <List.Header>
                      <Button color="green" onClick={() => history.push(`/${event.id}/users/invite`)}>Invite Users</Button>
                      <Button negative onClick={() => handleCancelEvent(event.id, user.id)}>Cancel Event</Button>
                      <Button color="blue" onClick={() => history.push(`/events/${event.id}`)}>Set Music Preferences</Button>
                      <Button color="blue" onClick={() => history.push(`/events/${event.id}/partyview`)}>Party View</Button>
                    </List.Header>
                    <List.Description>
                      <List.List as="ul">
                        <div className="type-container">
                          <List.Item as="li">Type: {event.type}</List.Item>
                          <List.Item as="li">Genres: {
                            event.genres.map(genre => (
                              `${genre}, `
                            ))
                          }
                          </List.Item>
                        </div>
                        <List.Item as="li">
                          <List.Content>Date & Time: {event.date} at {event.time}</List.Content>
                        </List.Item>
                        <div className="location-container">
                          <List.Item as="li">Address: {event.address}</List.Item>
                          <List.Item as="li">City: {event.city}</List.Item>
                          <List.Item as="li">State: {event.state}</List.Item>
                        </div>
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
        <Header as="h2" content="Upcoming Events" color="purple" />
        </Segment>
          <List divided inverted>
            {events &&
              events.map((event) => (
                (!event.eventUser.isHost && !event.hasEnded) &&
                <List.Item key={event.id}>
                  <Header as="h3" icon="sound" content={event.name} />

                  <List.Content floated="left">


                    <List.Header>
                      <Button color="blue" onClick={() => history.push(`/events/${event.id}`)}>Set Music Preferences</Button>
                      <Button color="purple" onClick={() => history.push(`/events/${event.id}/partyview`)}>Party View</Button>
                    </List.Header>
                    <List.Description>
                      <List.List as="ul">
                        <div className="type-container">
                          <List.Item as="li">Type: {event.type}</List.Item>
                          <List.Item as="li">Genres: {
                            event.genres.map(genre => (
                              `${genre}, `
                            ))
                          }
                          </List.Item>
                        </div>
                        <List.Item as="li">
                          <List.Content>Date & Time: {event.date} at {event.time}</List.Content>
                        </List.Item>
                        <div className="location-container">
                          <List.Item as="li">Address: {event.address}</List.Item>
                          <List.Item as="li">City: {event.city}</List.Item>
                          <List.Item as="li">State: {event.state}</List.Item>
                        </div>
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
        <Header as="h1" content="Past Events" color="purple" />
        </Segment>
          <List divided inverted>
            {events &&
              events.map((event) => (
                (event.eventUser.isAttending && event.hasEnded) &&
                <List.Item key={event.id}>
                  <Header as="h3" icon="sound" content={event.name} />

                  <List.Content floated="left">

                    <List.Description>
                      <List.List as="ul">
                        <div className="type-container">
                          <List.Item as="li">Type: {event.type}</List.Item>
                          <List.Item as="li">Genres: {
                            event.genres.map(genre => (
                              `${genre}, `
                            ))
                          }
                          </List.Item>
                        </div>
                        <List.Item as="li">
                          <List.Content>Date & Time: {event.date} at {event.time}</List.Content>
                        </List.Item>
                        <div className="location-container">
                          <List.Item as="li">Address: {event.address}</List.Item>
                          <List.Item as="li">City: {event.city}</List.Item>
                          <List.Item as="li">State: {event.state}</List.Item>
                        </div>
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
