import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createNewEvent } from '../store'
import { withRouter } from 'react-router-dom';
import { Button, Dropdown, Form, Rating } from 'semantic-ui-react'
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
      genres: [],
      danceability: 0,
      loudness: 0,
      energy: 0,
      acousticness: 0,
      valence: 0
    }
  }

  handleChange(evt) {
    var change = {}
    change[evt.target.name] = evt.target.value
    this.setState(change)
  }
  handleGenreChange = (evt, { value }) => {
    this.setState({ genres: value })
  }
  handleDanceability = (evt) => {
    this.setState({ danceability: evt.target.value * 1 })
  }
  handleLoudness = (evt) => {
    this.setState({ loudness: evt.target.value * 1 })
  }
  handleEnergy = (evt) => {
    this.setState({ energy: evt.target.value * 1 })
  }
  handleAcousticness = (evt) => {
    this.setState({ acousticness: evt.target.value * 1 })
  }
  handleValence = (evt) => {
    this.setState({ valence: evt.target.value * 1 })
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
    let danceability = this.state.danceability / 10
    let loudness = this.state.loudness / 10
    let energy = this.state.energy / 10
    let acousticness = this.state.acousticness / 10
    let valence = this.state.valence / 10

    // Very Sloppy approach to solve the id issue...
    if (this.props.newEvent.id) {
      this.props.history.push(`${this.props.newEvent.id}/users/invite`)
    }
    return (

      <div>
        <h3>Add New Event</h3>
        <Form onSubmit={(evt) => handleSubmit(evt, eventname, date, time, city, state, zip, address, type, genres, danceability, loudness, energy, acousticness, valence)}>
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
          <Form.Field>
            <label>Danceability</label>
            <input type='range' min={0} max={10} value={this.state.danceability} onChange={this.handleDanceability.bind(this)} />
            <br />
            <Rating rating={this.state.danceability} maxRating={10} />
          </Form.Field>
          <Form.Field>
            <label>Loudness</label>
            <input type='range' min={0} max={10} value={this.state.loudness} onChange={this.handleLoudness.bind(this)} />
            <br />
            <Rating rating={this.state.loudness} maxRating={10} />
          </Form.Field>
          <Form.Field>
            <label>Energy</label>
            <input type='range' min={0} max={10} value={this.state.energy} onChange={this.handleEnergy.bind(this)} />
            <br />
            <Rating rating={this.state.energy} maxRating={10} />
          </Form.Field>
          <Form.Field>
            <label>Acousticness</label>
            <input type='range' min={0} max={10} value={this.state.acousticness} onChange={this.handleAcousticness.bind(this)} />
            <br />
            <Rating rating={this.state.acousticness} maxRating={10} />
          </Form.Field>
          <Form.Field>
            <label>Valence</label>
            <input type='range' min={0} max={10} value={this.state.valence} onChange={this.handleValence.bind(this)} />
            <br />
            <Rating rating={this.state.valence} maxRating={10} />
          </Form.Field>
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
    handleSubmit(evt, name, date, time, city, state, zip, address, type, genres, danceability, loudness, energy, acousticness, valence) {
      let { history } = ownProps
      let newEvent = { name, date, time, city, state, zip, address, type, genres, danceability, loudness, energy, acousticness, valence }
      evt.preventDefault()
<<<<<<< HEAD
      dispatch(createNewEvent(newEvent, history))
      history.push('/users')
=======
      dispatch(createNewEvent(newEvent))
>>>>>>> master
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(NewEvent))
