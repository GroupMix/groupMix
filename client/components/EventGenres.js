import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
//import {addEventGenres} from '../store'
import { withRouter} from 'react-router-dom';

/**
 * COMPONENT
 */
const EventGenres = (props) => {
  const {newEvent, handleSubmit} = props

  return (
    <div>
      <h3>Add Event Genres</h3>
      <form className="ui form" onSubmit={handleSubmit}>
      <div className="field">
        <label>Event Name</label>
        <input type="text" name="genres" placeholder="genres" />
      </div>
      </form>
    </div>
  )
}

const mapState = (state) => {
  return {
    user: state.user
  }
}

// const mapDispatch = (dispatch) => {
//   return {
//     handleSubmit (evt) {
//       evt.preventDefault()
//       let genres = evt.target.genres.value
//       dispatch(addEventGenres(genres))
//     }
//   }
// }

export default withRouter(connect(mapState)(EventGenres))
