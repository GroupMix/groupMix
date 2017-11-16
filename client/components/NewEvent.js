import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {createNewEvent} from '../store'
import { withRouter} from 'react-router-dom';

/**
 * COMPONENT
 */
const NewEvent = (props) => {
  const {user, newEvent, handleSubmit} = props

  return (
    <div>
      <h3>Add New Event</h3>
      <form className="ui form" onSubmit={handleSubmit}>
      <div className="field">
        <label>Event Name</label>
        <input type="text" name="eventname" placeholder="event name" />
      </div>
      <div className="field">
        <label>Event Time</label>
        <input type="text" name="time" placeholder="time" />
      </div>
      <div className="field">
        <label>Event Date</label>
        <input type="text" name="date" placeholder="date" />
      </div>
      <div className="field">
        <label>City</label>
        <input type="text" name="city" placeholder="city" />
      </div>
      <div className="field">
        <label>State</label>
        <input type="text" name="state" placeholder="state" />
      </div>
      <div className="field">
        <label>Zip</label>
        <input type="text" name="zip" placeholder="zip" />
      </div>
      <div className="field">
        <label>Address</label>
        <input type="text" name="address" placeholder="address" />
      </div>
      <div className="field">
        <label>Type of Event</label>
        <input type="text" name="type" placeholder="type of event" />
      </div>
        <button className="ui button" type="submit">Submit</button>
      </form>
    </div>
  )
}

const mapState = (state) => {
  return {
    user: state.user,
    newEvent: state.newEvent
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      let name = evt.target.eventname.value
      let date = evt.target.date.value
      let time = evt.target.time.value
      let city = evt.target.city.value
      let state = evt.target.state.value
      let zip = evt.target.zip.value
      let address = evt.target.address.value
      let type = evt.target.type.value
      dispatch(createNewEvent(name, date, time, city, state, zip, address, type))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(NewEvent))
