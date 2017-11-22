import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import Navbar from './navbar'
import { Segment, Header, Icon } from 'semantic-ui-react'
import socket from '../socket'
let userIdForSocket
/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children, handleClick, isLoggedIn, user} = props
  userIdForSocket = user.id
  return (
    <div>
      <Navbar />
      <hr />
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

//GEOLOCATION
function sendCoords(lat, long, accuracy, userIdForSocket){
  let coords = {
    lat,
    long,
    accuracy,
    userIdForSocket
  }
  socket.emit('guestCoords', coords);
}

function geo_success(position) {
  sendCoords(position.coords.latitude, position.coords.longitude, position.coords.accuracy, userIdForSocket);
}
function geo_error() {
  alert("Sorry, no position available.");
}
var geo_options = {
  enableHighAccuracy: true,
  maximumAge        : 30000,
  timeout           : 27000
};

navigator.geolocation.watchPosition(geo_success, geo_error, geo_options)
