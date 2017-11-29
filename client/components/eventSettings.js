import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editEvent, prioritizeSongs, updateSpotifyPlaylist } from '../store'
import { withRouter } from 'react-router-dom';
import { Button, Dropdown, Form, Segment, Message, Header } from 'semantic-ui-react'
import genreList from './genreList'

/**
 * COMPONENT
 */
export class EventSettings extends Component {
  constructor(props) {
    super(props);

    const currentEvent = this.props.event

    this.state = {
      eventname: currentEvent.name,
      date: currentEvent.date,
      time: currentEvent.time,
      city: currentEvent.city,
      state: currentEvent.state,
      zip: currentEvent.zip,
      address: currentEvent.address,
      type: currentEvent.type,
      genres: currentEvent.genres,
      danceability: currentEvent.danceability,
      loudness: currentEvent.loudness,
      energy: currentEvent.energy,
      acousticness: currentEvent.acousticness,
      valence: currentEvent.valence,
      instrumentalness: currentEvent.instrumentalness,
      tempo: currentEvent.tempo,
      danceabilityWeight: currentEvent.danceabilityWeight,
      loudnessWeight: currentEvent.loudnessWeight,
      energyWeight: currentEvent.energyWeight,
      acousticnessWeight: currentEvent.acousticnessWeight,
      valenceWeight: currentEvent.valenceWeight,
      instrumentalnessWeight: currentEvent.instrumentalnessWeight,
      tempoWeight: currentEvent.tempoWeight,
      weightPoints: 10,
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
      console.log('pointsssss', this.state.submitVisible)
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
    const { handleModal, handleSubmit, user } = this.props

    let eventname = this.state.eventname
    let date = this.state.date
    let time = this.state.time
    let city = this.state.city
    let state = this.state.state
    let zip = this.state.zip
    let address = this.state.address
    let type = this.state.type
    let genres = this.state.genres
    let danceability;
    (this.state.danceability <= 1) ?
      (danceability = this.state.danceability) :
      (danceability = this.state.danceability / 10)
    let loudness;
    (this.state.loudness <= 1) ?
      (loudness = this.state.loudness) :
      (loudness = this.state.loudness / 10)
    let energy;
    (this.state.energy <= 1) ?
      (energy = this.state.energy) :
      (energy = this.state.energy / 10)
    let acousticness;
    (this.state.acousticness <= 1) ?
      (acousticness = this.state.acousticness) :
      (acousticness = this.state.acousticness / 10)
    let valence;
    (this.state.valence <= 1) ?
      (valence = this.state.valence) :
      (valence = this.state.valence / 10)
    let instrumentalness;
    (this.state.instrumentalness <= 1) ?
      (instrumentalness = this.state.instrumentalness) :
      (instrumentalness = this.state.instrumentalness / 10)
    let tempo = this.state.tempo;
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

      <div style={{ background: '#2184d0' }}>
      <Segment raised inverted>
      <Header textAlign="center" as="h1" color="purple" size= "huge" >Edit Event Settings</Header>
          <Form inverted onSubmit={(evt) => {
            handleSubmit(evt, this.props.event.id, eventname, date, time, city, state, zip, address, type, genres, danceability, danceabilityWeight, loudness, loudnessWeight, energy, energyWeight, acousticness, acousticnessWeight, valence, valenceWeight, instrumentalness, instrumentalnessWeight, tempo, tempoWeight, spotifyUserId, token);
            handleModal(evt)
          }}>
          <Form.Group>
              <StyleFormGroup
                control={Dropdown} label="Genres" name="genres" placeholder="select your event music genres" fluid multiple search selection options={genreList} onChange={this.handleGenreChange.bind(this)} defaultValue={this.state.genres}>
              </StyleFormGroup>
              </Form.Group>

              <Form.Group widths="equal">
              <StyleFormGroup>
                <label>Danceability:{(this.state.danceability) <= 1 ? (this.state.danceability * 10) : (this.state.danceability)}
                </label>
                <input type="range" min={0} max={10} value={(this.state.danceability) <= 1 ? (this.state.danceability * 10) : (this.state.danceability)} onChange={this.handleDanceability.bind(this)} />
                </StyleFormGroup>
              <StyleFormGroup>
                <label>Danceability Importance:</label>
                <input type="number" width={2} min={0} max={10} value={this.state.danceabilityWeight} onChange={this.handleDanceabilityWeight.bind(this)} />
               </StyleFormGroup>
              </Form.Group>
              <Form.Group widths="equal">
              <StyleFormGroup>
                <label>Loudness: {(this.state.loudness) <= 1 ? (this.state.loudness * 10) : (this.state.loudness)}</label>
                <input type="range" min={0} max={10} value={(this.state.loudness) <= 1 ? (this.state.loudness * 10) : (this.state.loudness)} onChange={this.handleLoudness.bind(this)} />

              </StyleFormGroup>
              <StyleFormGroup>
                <label>Loudness Importance:</label>
                <input type="number" width={2} min={0} max={10} value={this.state.loudnessWeight} onChange={this.handleLoudnessWeight.bind(this)} />

              </StyleFormGroup>
              </Form.Group>
              <Form.Group widths="equal">
              <StyleFormGroup>
                <label>Energy: {(this.state.energy) <= 1 ? (this.state.energy * 10) : (this.state.energy)}</label>
                <input type="range" min={0} max={10} value={(this.state.energy) <= 1 ? (this.state.energy * 10) : (this.state.energy)} onChange={this.handleEnergy.bind(this)} />
              </StyleFormGroup>
              <StyleFormGroup>
                <label>Energy Importance:</label>
                <input type="number" width={2} min={0} max={10} value={this.state.energyWeight} onChange={this.handleEnergyWeight.bind(this)} />
              </StyleFormGroup>
              </Form.Group>
              <Form.Group widths="equal">
              <StyleFormGroup>
                <label>Acousticness: {(this.state.acousticness) <= 1 ? (this.state.acousticness * 10) : (this.state.acousticness)}</label>
                <input type="range" min={0} max={10} value={(this.state.acousticness) <= 1 ? (this.state.acousticness * 10) : (this.state.acousticness)} onChange={this.handleAcousticness.bind(this)} />
              </StyleFormGroup>
              <StyleFormGroup>
                <label>Acousticness Importance:</label>
                <input type="number" width={2} min={0} max={10} value={this.state.acousticnessWeight} onChange={this.handleAcousticnessWeight.bind(this)} />
              </StyleFormGroup>
              </Form.Group>
              <Form.Group widths="equal">
              <StyleFormGroup>
                <label>Happiness: {(this.state.valence) <= 1 ? (this.state.valence * 10) : (this.state.valence)}</label>
                <input type="range" min={0} max={10} value={(this.state.valence) <= 1 ? (this.state.valence * 10) : (this.state.valence)} onChange={this.handleValence.bind(this)} />
              </StyleFormGroup>
              <StyleFormGroup>
                <label>Happiness Importance:</label>
                <input type="number" width={2} min={0} max={10} value={this.state.valenceWeight} onChange={this.handleValenceWeight.bind(this)} />
              </StyleFormGroup>
              </Form.Group>
              <Form.Group widths="equal">
              <StyleFormGroup>
              <label>Instrumentalness: {(this.state.instrumentalness) <= 1 ? (this.state.instrumentalness * 10) : (this.state.instrumentalness)}</label>
              <input type="range" min={0} max={10} value={(this.state.instrumentalness) <= 1 ? (this.state.instrumentalness * 10) : (this.state.instrumentalness)} onChange={this.handleInstrumentalness.bind(this)} />
            </StyleFormGroup>
            <StyleFormGroup>
              <label>Instrumentalness Importance:</label>
              <input type="number" width={2} min={0} max={10} value={this.state.instrumentalnessWeight} onChange={this.handleInstrumentalnessWeight.bind(this)} />
            </StyleFormGroup>
            </Form.Group>
            <Form.Group widths="equal">
            <StyleFormGroup>
            <label>Tempo: {(this.state.tempo)}</label>
            <input type="range" min={0} max={160} value={this.state.tempo} onChange={this.handleTempo.bind(this)} />
          </StyleFormGroup>
          <StyleFormGroup>
            <label>Tempo Importance:</label>
            <input type="number" width={2} min={0} max={10} value={this.state.tempoWeight} onChange={this.handleTempoWeight.bind(this)} />
          </StyleFormGroup>
          </Form.Group>
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {this.renderError()}
                <Button disabled={this.state.submitVisible} color="purple" type="submit" size="huge">Submit</Button>
              </div>
          </Form>
        </Segment>
      </div>
    )
  }
  renderError() {
    if (this.state.visible) {
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

const mapState = (state, ownProps) => {
  return {
    user: state.user,
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit(evt, eventId, name, date, time, city, state, zip, address, type, genres, danceability, danceabilityWeight, loudness, loudnessWeight, energy, energyWeight, acousticness, acousticnessWeight, valence, valenceWeight, instrumentalness, instrumentalnessWeight, tempo, tempoWeight, spotifyUserId, token) {

      evt.preventDefault()

      let { history } = ownProps;

      let updatedEvent = { name, eventId, date, time, city, state, zip, address, type, genres, danceability, danceabilityWeight, loudness, loudnessWeight, energy, energyWeight, acousticness, acousticnessWeight, valence, valenceWeight, instrumentalness, instrumentalnessWeight, tempo, tempoWeight, spotifyUserId, token }

      dispatch(editEvent(eventId, updatedEvent))
      dispatch(prioritizeSongs(eventId))
        .then(() => {
          dispatch(updateSpotifyPlaylist(eventId))
        })
    },
  }
}

export default withRouter(connect(mapState, mapDispatch)(EventSettings))
