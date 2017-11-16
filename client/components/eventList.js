import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Segment } from 'semantic-ui-react';
import { fetchUserEvents } from '../store';

class EventList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(props) {
    console.log('MOUNTED')
    this.props.loadEvents(this.props.user.id)
  }

  render() {
    const { events, user } = this.props
    return (
      <div>

      <Segment>
        <List >
          {events &&
            events.map((event) => (
              <List.Item key={event.id}>
                <List.Content>
                  example
                <List.Header>
                    example
                </List.Header>
                  <List.Description>
                    {event.type}
                  </List.Description>
                </List.Content>
              </List.Item>
            ))
          }
        </List>
      </Segment>



      <Segment>
      <List >
        {events &&
          events.map((event) => (
            <List.Item key={event.id}>
              <List.Content>
                example
              <List.Header>
                  example
              </List.Header>
                <List.Description>
                  {event.type}
                </List.Description>
              </List.Content>
            </List.Item>
          ))
        }
      </List>
    </Segment>



      <Segment>
      <List >
        {events &&
          events.map((event) => (
            <List.Item key={event.id}>
              <List.Content>
                example
              <List.Header>
                  example
              </List.Header>
                <List.Description>
                  {event.type}
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
  events: state.events
})

const mapDispatch = (dispatch) => ({
  loadEvents(userId) {
    dispatch(fetchUserEvents(userId))
  }
})

export default connect(mapState, mapDispatch)(EventList)

