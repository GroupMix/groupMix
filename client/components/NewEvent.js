import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createNewEvent, createSpotifyPlaylist } from '../store'
import { withRouter } from 'react-router-dom';
import { Button, Dropdown, Form, Rating, Segment, Header, Message } from 'semantic-ui-react'
import { EventGenres } from '/'
import genreList from './genreList'

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
      valence: 0,
      danceabilityWeight: 0,
      loudnessWeight: 0,
      energyWeight: 0,
      acousticnessWeight: 0,
      valenceWeight: 0,
      weightPoints: 10,
      visible: false,
      submitVisible: false,
    }
    this.renderError = this.renderError.bind(this)
    this.checkPoints = this.checkPoints.bind(this)
    this.handleDismiss = this.handleDismiss.bind(this)
  }

  checkPoints() {
    if (this.state.weightPoints < 0){
      this.setState({ visible: true, submitVisible: true })
      console.log('pointsssss', this.state.submitVisible )
    }
    else if (this.state.weightPoints >= 0){
      this.setState({ visible: false, submitVisible: false })

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
  handleDanceabilityWeight = (evt) => {
    let pointsUsed = (evt.target.value * 1) - this.state.danceabilityWeight;


    let remainingPoints = this.state.weightPoints - pointsUsed;
    this.setState({ danceabilityWeight: evt.target.value * 1, weightPoints: remainingPoints})
    setTimeout(() => {
      this.checkPoints()
    }, 2000)
  }
  handleLoudnessWeight = (evt) => {
    let pointsUsed = (evt.target.value * 1) - this.state.loudnessWeight;
    let remainingPoints = this.state.weightPoints - pointsUsed;
    this.setState({ loudnessWeight: evt.target.value * 1, weightPoints: remainingPoints })
    setTimeout(() => {
      this.checkPoints()
    }, 2000)

  }
  handleEnergyWeight = (evt) => {
    let pointsUsed = (evt.target.value * 1) - this.state.energyWeight;
    let remainingPoints = this.state.weightPoints - pointsUsed;
    this.setState({ energyWeight: evt.target.value * 1, weightPoints: remainingPoints })

    setTimeout(() => {
      this.checkPoints()
    }, 2000)
  }
  handleAcousticnessWeight = (evt) => {
    let pointsUsed = (evt.target.value * 1) - this.state.acousticnessWeight;
    let remainingPoints = this.state.weightPoints - pointsUsed;
    this.setState({ acousticnessWeight: evt.target.value * 1, weightPoints: remainingPoints })

    setTimeout(() => {
      this.checkPoints()
    }, 2000)
  }
  handleValenceWeight = (evt) => {
    let pointsUsed = (evt.target.value * 1) - this.state.valenceWeight;
    let remainingPoints = this.state.weightPoints - pointsUsed;
    this.setState({ valenceWeight: evt.target.value * 1, weightPoints: remainingPoints })
    setTimeout(() => {
      this.checkPoints()
    }, 2000)
  }
  handleDismiss = () => {
    this.setState({ messageVisible: false })
  }

  render() {
    const { handleSubmit, user } = this.props

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
    let danceabilityWeight = this.state.danceabilityWeight
    let loudnessWeight = this.state.loudnessWeight
    let energyWeight = this.state.energyWeight
    let acousticnessWeight = this.state.acousticnessWeight
    let valenceWeight = this.state.valenceWeight
    let spotifyUserId = user.user.spotifyUserId
    let token = user.access

    return (

      <div>
        <Segment inverted>
          <Header textAlign="center" as="h1" color="purple">Add New Event</Header>
          <Form inverted onSubmit={(evt) => handleSubmit(evt, name, date, time, city, state, zip, address, type, genres, danceability, danceabilityWeight, loudness, loudnessWeight, energy, energyWeight, acousticness, acousticnessWeight, valence, valenceWeight, spotifyUserId, token)}>
            <Form.Field>
              <label>Event Name</label>
              <input name="eventname" onChange={this.handleChange.bind(this)} value={this.state.eventname} placeholder="event name" />
            </Form.Field>
            <Form.Field>
              <label>Date</label>
              <input name="date" onChange={this.handleChange.bind(this)} value={this.state.date} placeholder="date" />
            </Form.Field>
            <Form.Field>
              <label>Time</label>
              <input name="time" onChange={this.handleChange.bind(this)} value={this.state.time} placeholder="time" />
            </Form.Field>
            <Form.Field>
              <label>City</label>
              <input name="city" onChange={this.handleChange.bind(this)} value={this.state.city} placeholder="state" />
            </Form.Field>
            <Form.Field>
              <label>State</label>
              <input name="state" onChange={this.handleChange.bind(this)} value={this.state.state} placeholder="state" />
            </Form.Field>
            <Form.Field>
              <label>Zip</label>
              <input name="zip" onChange={this.handleChange.bind(this)} value={this.state.zip} placeholder="zip" />
            </Form.Field>
            <Form.Field>
              <label>Address</label>
              <input name="address" onChange={this.handleChange.bind(this)} value={this.state.address} placeholder="address" />
            </Form.Field>
            <Form.Field>
              <label>Event Type</label>
              <input name="type" onChange={this.handleChange.bind(this)} value={this.state.type} placeholder="event type" />
            </Form.Field>
            <Form.Field
              control={Dropdown} label="Genres" name="genres" placeholder="select your event music genres" fluid multiple search selection options={genreList} onChange={this.handleGenreChange.bind(this)} defaultValue={this.state.genres}
            />
            <Form.Field inverted>
              <label>Danceability: {this.state.danceability}</label>
              <input type="range" min={0} max={10} value={this.state.danceability} onChange={this.handleDanceability.bind(this)} />
              <br />

            </Form.Field>
            <Form.Field inline inverted>
              <label>Danceability Importance:</label>
              <input type="number" width={2} min={0} max={10} value={this.state.danceabilityWeight} onChange={this.handleDanceabilityWeight.bind(this)} />
            </Form.Field>


            <Form.Field>
              <label>Loudness: {this.state.loudness}</label>
              <input type="range" min={0} max={10} value={this.state.loudness} onChange={this.handleLoudness.bind(this)} />
              <br />
            </Form.Field>
            <Form.Field inline inverted>
              <label>Loudness Importance:</label>
              <input type="number" width={2} min={0} max={10} value={this.state.loudnessWeight} onChange={this.handleLoudnessWeight.bind(this)} />
            </Form.Field>
            <Form.Field>
              <label>Energy: {this.state.energy}</label>
              <input type="range" min={0} max={10} value={this.state.energy} onChange={this.handleEnergy.bind(this)} />
              <br />
            </Form.Field>
            <Form.Field inline inverted>
              <label>Energy Importance:</label>
              <input type="number" width={2} min={0} max={10} value={this.state.energyWeight} onChange={this.handleEnergyWeight.bind(this)} />
            </Form.Field>
            <Form.Field>
              <label>Acousticness: {this.state.acousticness}</label>
              <input type="range" min={0} max={10} value={this.state.acousticness} onChange={this.handleAcousticness.bind(this)} />
              <br />

            </Form.Field>
            <Form.Field inline inverted>
              <label>Acousticness Importance:</label>
              <input type="number" width={2} min={0} max={10} value={this.state.acousticnessWeight} onChange={this.handleAcousticnessWeight.bind(this)} />
            </Form.Field>
            <Form.Field>
              <label>Valence: {this.state.valence}</label>
              <input type="range" min={0} max={10} value={this.state.valence} onChange={this.handleValence.bind(this)} />
              <br />
            </Form.Field>
            <Form.Field inline inverted>
              <label>Valence Importance:</label>
              <input type="number" width={2} min={0} max={10} value={this.state.valenceWeight} onChange={this.handleValenceWeight.bind(this)} />
            </Form.Field>
            <div>
            { this.renderError() }
              <Button disabled={this.state.submitVisible} color="purple" type="submit">Submit</Button>
            </div>
          </Form>
        </Segment>
      </div>
    )
  }
  renderError() {
    console.log("HITTING IF")
    if (this.state.visible) {
console.log("ERROR SHOWING")
      return (
        <Message
          onDismiss={this.handleDismiss}
          color = "red"
          header="You have used too many points!"
          content="You only have 10 total points to split between the importance fields."
        />
      );
    }
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
    handleSubmit(evt, name, date, time, city, state, zip, address, type, genres, danceability, danceabilityWeight, loudness, loudnessWeight, energy, energyWeight, acousticness, acousticnessWeight, valence, valenceWeight, spotifyUserId, token) {
      let { history } = ownProps
      let newEvent = { name, date, time, city, state, zip, address, type, genres, danceability, danceabilityWeight, loudness, loudnessWeight, energy, energyWeight, acousticness, acousticnessWeight, valence, valenceWeight, spotifyUserId, token }
      evt.preventDefault()
      dispatch(createNewEvent(newEvent, history))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(NewEvent))
