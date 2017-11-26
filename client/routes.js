import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import { Main, Login, Signup, UserHome, EventList, NewEvent, EventGenres, LandingPage, UsersList, Playlist, PartyView } from './components'
import { withRouter } from 'react-router-dom'
import { me } from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/eventgenres" component={EventGenres} />
            {
              isLoggedIn &&
              <Switch>
                {/* Routes placed here are only available after logging in */}

                <Route path="/events/:eventId/partyview" component={PartyView} />
                <Route path="/:eventId/users/invite" component={UsersList} />
                <Route path="/viewPlaylist/:eventId" component={Playlist} />
                <Route path="/eventList" component={EventList} />
                <Route path="/events/:eventId" component={UserHome} />
                <Route path="/newevent" component={NewEvent} />
              </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    events: state.events
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
