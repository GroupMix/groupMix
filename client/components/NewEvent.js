import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createNewEvent, createSpotifyPlaylist } from '../store'
import { withRouter } from 'react-router-dom';
import { Button, Dropdown, Form, Rating, Segment, Header, Message } from 'semantic-ui-react'
import { EventGenres } from '/'
import genreList from './genreList'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css'

/**
 * COMPONENT
 */
export class NewEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventname: '',
      date: moment(),
      type: '',
      genres: [],
      danceability: 0,
      loudness: 0,
      energy: 0,
      acousticness: 0,
      valence: 0,
      instrumentalness: 0,
      tempo: 0,
      danceabilityWeight: 1,
      loudnessWeight: 1,
      energyWeight: 1,
      acousticnessWeight: 1,
      valenceWeight: 1,
      instrumentalnessWeight: 1,
      tempoWeight: 1,
      weightPoints: 12,
      visible: false,
      submitVisible: false,
    }
    this.renderError = this.renderError.bind(this)
    this.checkPoints = this.checkPoints.bind(this)
    this.handleDismiss = this.handleDismiss.bind(this)
  }

  checkPoints() {
    if (this.state.weightPoints < 0) {
      this.setState({ visible: true, submitVisible: true })
    }
    else if (this.state.weightPoints >= 0) {
      this.setState({ visible: false, submitVisible: false })
    }

  }
  handleChange(evt) {
    var change = {}
    change[evt.target.name] = evt.target.value
    this.setState(change)
  }
  handleDateChange = (evt) => {
    this.setState({ date: evt })
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
  handleInstrumentalness = (evt) => {
    this.setState({ instrumentalness: evt.target.value * 1 })
  }
  handleTempo = (evt) => {
    this.setState({ tempo: evt.target.value * 1 })
  }
  handleDanceabilityWeight = (evt) => {
    let pointsUsed = (evt.target.value * 1) - this.state.danceabilityWeight;


    let remainingPoints = this.state.weightPoints - pointsUsed;
    this.setState({ danceabilityWeight: evt.target.value * 1, weightPoints: remainingPoints })
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
  handleInstrumentalnessWeight = (evt) => {
    let pointsUsed = (evt.target.value * 1) - this.state.instrumentalnessWeight;
    let remainingPoints = this.state.weightPoints - pointsUsed;
    this.setState({ instrumentalnessWeight: evt.target.value * 1, weightPoints: remainingPoints })
    setTimeout(() => {
      this.checkPoints()
    }, 2000)
  }
  handleTempoWeight = (evt) => {
    let pointsUsed = (evt.target.value * 1) - this.state.tempoWeight;
    let remainingPoints = this.state.weightPoints - pointsUsed;
    this.setState({ tempoWeight: evt.target.value * 1, weightPoints: remainingPoints })
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
    let type = this.state.type
    let genres = this.state.genres
    let danceability = this.state.danceability / 10
    let loudness = this.state.loudness / 10
    let energy = this.state.energy / 10
    let acousticness = this.state.acousticness / 10
    let valence = this.state.valence / 10
    let instrumentalness = this.state.instrumentalness / 10
    let tempo = this.state.tempo
    let danceabilityWeight = this.state.danceabilityWeight
    let loudnessWeight = this.state.loudnessWeight
    let energyWeight = this.state.energyWeight
    let acousticnessWeight = this.state.acousticnessWeight
    let valenceWeight = this.state.valenceWeight
    let instrumentalnessWeight = this.state.instrumentalnessWeight
    let tempoWeight = this.state.tempoWeight
    let spotifyUserId = user.user.spotifyUserId
    let token = user.access
    const StyleFormGroup = (props) => {
      return (
        <Form.Field inline inverted style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {props.children}
        </Form.Field>
      )
    }

    return (

      <div style={{ marginLeft: '9em', marginRight: '9em', background: '#2184d0' }}>
        <Segment raised padded inverted style={{ paddingLeft: '6em', paddingRight: '6em', height: '-webkit-fill-available', marginTop: '.85em' }}>
          <Header textAlign="center" as="h1" color="purple" size= "huge" >Create New Event</Header>
          <Form size="large" inverted onSubmit={(evt) => handleSubmit(evt, eventname, date, type, genres, danceability, danceabilityWeight, loudness, loudnessWeight, energy, energyWeight, acousticness, acousticnessWeight, valence, valenceWeight, instrumentalness, instrumentalnessWeight, tempo, tempoWeight, spotifyUserId, token)}>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Event Name</label>
                <input name="eventname" onChange={this.handleChange.bind(this)} value={this.state.eventname} placeholder="New Year's Celebration" />
              </Form.Field>
              <Form.Field width = {6}>
                <label>Date</label>
                <DatePicker
                  name="date"
                  selected={this.state.date}
                  value={this.state.date}
                  onChange={this.handleDateChange.bind(this)}
                  required={true}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Event Description</label>
                <input name="type" onChange={this.handleChange.bind(this)} value={this.state.type} placeholder="Party" required={true} />
              </Form.Field>
              <Form.Field
                control={Dropdown} label="Genre Preferences" name="genres" placeholder="Hip Hop, Electronic, Pop" fluid multiple search selection options={genreList} onChange={this.handleGenreChange.bind(this)} defaultValue={this.state.genres}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <StyleFormGroup>
                <label>Danceability: {this.state.danceability}</label>
                <input type="range" min={0} max={10} value={this.state.danceability} onChange={this.handleDanceability.bind(this)} />
              </StyleFormGroup>
              <StyleFormGroup>
                <label>Danceability Importance: </label>
                <input type="number" width={2} min={0} max={10} value={this.state.danceabilityWeight} onChange={this.handleDanceabilityWeight.bind(this)} />
              </StyleFormGroup>
            </Form.Group>
            <Form.Group widths="equal">
              <StyleFormGroup>
                <label>Loudness: {this.state.loudness}</label>
                <input type="range" min={0} max={10} value={this.state.loudness} onChange={this.handleLoudness.bind(this)} />
              </StyleFormGroup>
              <StyleFormGroup>
                <label>Loudness Importance:    </label>
                <input type="number" width={2} min={0} max={10} value={this.state.loudnessWeight} onChange={this.handleLoudnessWeight.bind(this)} />
              </StyleFormGroup>
            </Form.Group>
            <Form.Group widths="equal">
              <StyleFormGroup>
                <label>Energy: {this.state.energy}</label>
                <input type="range" min={0} max={10} value={this.state.energy} onChange={this.handleEnergy.bind(this)} />
              </StyleFormGroup>
              <StyleFormGroup >
                <label>Energy Importance:      </label>
                <input type="number" width={2} min={0} max={10} value={this.state.energyWeight} onChange={this.handleEnergyWeight.bind(this)} />
              </StyleFormGroup>
            </Form.Group>
            <Form.Group widths="equal">
              <StyleFormGroup>
                <label>Acousticness: {this.state.acousticness}</label>
                <input type="range" min={0} max={10} value={this.state.acousticness} onChange={this.handleAcousticness.bind(this)} />

              </StyleFormGroup>
              <StyleFormGroup>
                <label>Acousticness Importance:</label>
                <input type="number" width={2} min={0} max={10} value={this.state.acousticnessWeight} onChange={this.handleAcousticnessWeight.bind(this)} />
              </StyleFormGroup>
            </Form.Group>
            <Form.Group widths="equal">
              <StyleFormGroup>
                <label>Happiness: {this.state.valence}</label>
                <input type="range" min={0} max={10} value={this.state.valence} onChange={this.handleValence.bind(this)} />
              </StyleFormGroup>
              <StyleFormGroup>
                <label>Hapiness Importance:     </label>
                <input type="number" width={2} min={0} max={10} value={this.state.valenceWeight} onChange={this.handleValenceWeight.bind(this)} />
              </StyleFormGroup>
            </Form.Group>
            <Form.Group widths="equal">
            <StyleFormGroup>
              <label>Instrumentalness: {this.state.instrumentalness}</label>
              <input type="range" min={0} max={10} value={this.state.instrumentalness} onChange={this.handleInstrumentalness.bind(this)} />
            </StyleFormGroup>
            <StyleFormGroup>
              <label>Instrumentalness Importance:     </label>
              <input type="number" width={2} min={0} max={10} value={this.state.instrumentalnessWeight} onChange={this.handleInstrumentalnessWeight.bind(this)} />
            </StyleFormGroup>
          </Form.Group>
          <Form.Group widths="equal">
          <StyleFormGroup>
            <label>Tempo: {this.state.tempo}</label>
            <input type="range" min={0} max={160} value={this.state.tempo} onChange={this.handleTempo.bind(this)} />
          </StyleFormGroup>
          <StyleFormGroup>
            <label>Tempo Importance:     </label>
            <input type="number" width={2} min={0} max={10} value={this.state.tempoWeight} onChange={this.handleTempoWeight.bind(this)} />
          </StyleFormGroup>
        </Form.Group>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {this.renderError()}
              <Button disabled={this.state.submitVisible} color="purple" type="submit" size="huge">Create Event</Button>
            </div>
          </Form>
        </Segment>
      </div>
    )
  }
  renderError() {
    if (this.state.visible) {
      console.log('ERROR SHOWING')
      return (
        <Message
          onDismiss={this.handleDismiss}
          color="red"
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
    handleSubmit(evt, name, date, type, genres, danceability, danceabilityWeight, loudness, loudnessWeight, energy, energyWeight, acousticness, acousticnessWeight, valence, valenceWeight, instrumentalness, instrumentalnessWeight, tempo, tempoWeight, spotifyUserId, token) {
      let { history } = ownProps
      let newEvent = { name, date, type, genres, danceability, danceabilityWeight, loudness, loudnessWeight, energy, energyWeight, acousticness, acousticnessWeight, valence, valenceWeight, instrumentalness, instrumentalnessWeight, tempo, tempoWeight, spotifyUserId, token }
      evt.preventDefault()
      dispatch(createNewEvent(newEvent, history))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(NewEvent))
