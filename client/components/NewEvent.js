import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createNewEvent } from '../store'
import { withRouter } from 'react-router-dom';
import { Button, Dropdown, Form } from 'semantic-ui-react'
import { EventGenres } from '/'

/**
 * COMPONENT
 */
export class NewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventname: '',
      date: '',
      time: '',
      city: '',
      state: '',
      zip: '',
      address: '',
      type: '',
      genres: []
    }
  }

  handleChange(evt) {
    var change = {}
    console.log(evt.target.value)
    change[evt.target.name] = evt.target.value
    this.setState(change)
  }

  handleGenreChange = (evt, { name, value }) => {
    console.log("value", value)
    this.setState({ genres: value })
    console.log(this.state.genres)
  }

  render() {
    const { handleSubmit } = this.props
    const genreList = [
      { key: 'acoustic', text: 'acoustic', value: 'acoustic' },
      { key: 'afrobeat', text: 'afrobeat', value: 'afrobeat' },
      { key: 'alt-rock', text: 'alt-rock', value: 'alt-rock' },
      { key: 'alternative', text: 'alternative', value: 'alternative' },
      { key: 'bluegrass', text: 'bluegrass', value: 'bluegrass' },
      { key: 'blues', text: 'blues', value: 'blues' },
      { key: 'chicago-house', text: 'chicago-house', value: 'chicago-house' },
      { key: 'children', text: 'children', value: 'children' },
      { key: 'chill', text: 'chill', value: 'chill' },
      { key: 'classical', text: 'classical', value: 'classical' },
      { key: 'club', text: 'club', value: 'club' },
      { key: 'country', text: 'country', value: 'country' },
      { key: 'dance', text: 'dance', value: 'dance' },
      { key: 'dancehall', text: 'dancehall', value: 'dancehall' },
      { key: 'death-metal', text: 'death-metal', value: 'death-metal' },
      { key: 'deep-house', text: 'deep-house', value: 'deep-house' },
      { key: 'disco', text: 'disco', value: 'disco' },
      { key: 'disney', text: 'disney', value: 'disney' },
    ]
    let eventname = this.state.eventname
    let date = this.state.date
    let time = this.state.time
    let city = this.state.city
    let state = this.state.state
    let zip = this.state.eventname
    let address = this.state.address
    let type = this.state.type
    let genres = this.state.genres

    // Very Sloppy approach to solve the id issue...
    if (this.props.newEvent.id) {
      this.props.history.push(`${this.props.newEvent.id}/users/invite`)
    }
    return (
      <div>
        <h3>Add New Event</h3>
        <Form onSubmit={(evt) => handleSubmit(evt, eventname, date, time, city, state, zip, address, type, genres)}>
          <Form.Field>
            <label>Event Name</label>
            <input name="eventname" onChange={this.handleChange.bind(this)} value={this.state.eventname} placeholder='event name' />
          </Form.Field>
          <Form.Field>
            <label>Date</label>
            <input name="date" onChange={this.handleChange.bind(this)} value={this.state.date} placeholder='date' />
          </Form.Field>
          <Form.Field>
            <label>Time</label>
            <input name="time" onChange={this.handleChange.bind(this)} value={this.state.time} placeholder='time' />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input name="city" onChange={this.handleChange.bind(this)} value={this.state.city} placeholder='state' />
          </Form.Field>
          <Form.Field>
            <label>State</label>
            <input name="state" onChange={this.handleChange.bind(this)} value={this.state.state} placeholder='state' />
          </Form.Field>
          <Form.Field>
            <label>Zip</label>
            <input name="zip" onChange={this.handleChange.bind(this)} value={this.state.zip} placeholder='zip' />
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <input name="address" onChange={this.handleChange.bind(this)} value={this.state.address} placeholder='address' />
          </Form.Field>
          <Form.Field>
            <label>Event Type</label>
            <input name="type" onChange={this.handleChange.bind(this)} value={this.state.type} placeholder='event type' />
          </Form.Field>
          <Form.Field
            control={Dropdown} label="Genres" name="genres" placeholder='select your event music genres' fluid multiple search selection options={genreList} onChange={this.handleGenreChange.bind(this)} defaultValue={this.state.genres}
          />
          <div>
            <Button type='submit'>Submit</Button>
          </div>
        </Form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    newEvent: state.newEvent
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit(evt, name, date, time, city, state, zip, address, type, genres) {
      let { history } = ownProps
      let newEvent = { name, date, time, city, state, zip, address, type, genres }
      evt.preventDefault()
      dispatch(createNewEvent(newEvent))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(NewEvent))
