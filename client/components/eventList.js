import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Segment, Button } from 'semantic-ui-react';
import { fetchUserEvents, setRsvp } from '../store';

class EventList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(props) {
    this.props.loadEvents(this.props.user.id)
  }

  render() {
    const { events, user, handleSubmit } = this.props
    const rsvpYes = true;
    const rsvpNo = false;
    return (
      <div>

        <Segment className="invited-events">
          <Segment compact='true'>Invitations</Segment>
          <List divided>
            {events &&
              events.map((event) => (
                (event.eventUser.isAttending === null && !event.hasEnded) &&
                <List.Item key={event.id}>
                  <List.Icon name='sound' size='large' verticalAlign='top' />
                  <List.Content floated='right'>
                    <Button onClick={evt => handleSubmit(evt, event.id, user.id, rsvpYes)}>Yes</Button>
                    <Button onClick={evt => handleSubmit(evt, event.id, user.id, rsvpNo)}>No</Button>
                  </List.Content>
                  <List.Content>
                    <List.Header>
                      {event.name}
                    </List.Header>
                    <List.Description>
                      <List.List as='ul'>
                        <List.Item as='li'>Type: {event.type}</List.Item>
                        <List.Item as='li'>Genres: {event.genres}</List.Item>
                        <List.Item as='li'>
                          <List.Content>Date & Time: {event.date} at {event.time}</List.Content>
                        </List.Item>
                        <List.Item as='li'>Address: {event.address}</List.Item>
                        <List.Item as='li'>City: {event.city}</List.Item>
                        <List.Item as='li'>State: {event.state}</List.Item>
                      </List.List>
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))
            }
          </List>
        </Segment>

        <Segment className="upcoming-events">
          <Segment compact='true'>Upcoming Events</Segment>
          <List divided>
            {events &&
              events.map((event) => (
                (event.eventUser.isAttending && !event.hasEnded) &&
                <List.Item key={event.id}>
                  <List.Icon name='sound' size='large' verticalAlign='top' />
                  <List.Content>
                    <List.Header>
                      {event.name}
                    </List.Header>
                    <List.Description>
                      <List.List as='ul'>
                        <List.Item as='li'>Type: {event.type}</List.Item>
                        <List.Item as='li'>Genres: {event.genres}</List.Item>
                        <List.Item as='li'>
                          <List.Content>Date & Time: {event.date} at {event.time}</List.Content>
                        </List.Item>
                        <List.Item as='li'>Address: {event.address}</List.Item>
                        <List.Item as='li'>City: {event.city}</List.Item>
                        <List.Item as='li'>State: {event.state}</List.Item>
                      </List.List>
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))
            }
          </List>
        </Segment>

        <Segment className="past-events">
          <Segment compact='true'>Past Events</Segment>
          <List divided>
            {events &&
              events.map((event) => (
                (event.eventUser.isAttending && event.hasEnded) &&
                <List.Item key={event.id}>
                  <List.Icon name='sound' size='large' verticalAlign='top' />
                  <List.Content>
                    <List.Header>
                      {event.name}
                    </List.Header>
                    <List.Description>
                      <List.List as='ul'>
                        <List.Item as='li'>Type: {event.type}</List.Item>
                        <List.Item as='li'>Genres: {event.genres}</List.Item>
                        <List.Item as='li'>
                          <List.Content>Date & Time: {event.date} at {event.time}</List.Content>
                        </List.Item>
                        <List.Item as='li'>Address: {event.address}</List.Item>
                        <List.Item as='li'>City: {event.city}</List.Item>
                        <List.Item as='li'>State: {event.state}</List.Item>
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

const mapDispatch = (dispatch) => ({
  loadEvents(userId) {
    dispatch(fetchUserEvents(userId))
  },
  handleSubmit(evt, eventId, userId, rsvp) {
    evt.preventDefault();
    dispatch(setRsvp(eventId, userId, rsvp))
  }
})

export default connect(mapState, mapDispatch)(EventList)

