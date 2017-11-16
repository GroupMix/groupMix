import React from 'react'
import {
  Button,
  Container,
  Menu,
  Icon,
  Segment,
  Header,
  Divider,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { logout } from '../store/user'


const Navbar = (props) => {
  const {
    handleClick, isLoggedIn, isHost,
  } = props

  return (

    <Segment
      inverted
      textAlign="center"
      style={{ padding: '0em', marginBottom: '-2em' }}
      vertical
    >
    <Header inverted as="h1" color="blue" floated="left" style={{ marginTop: '.7em'}}>
    <Icon name="music" size="large" color="blue" />
    groupMix
    </Header>
      <Container>
        <Menu inverted pointing secondary size="large" style={{ paddingTop: '1em'}}>
          <Menu.Item as={Link} to="/"><Icon name="home" />Home</Menu.Item>
          <Menu.Item as={Link} to="/aboutus">About Us</Menu.Item>
          {

          isLoggedIn
          ?
            <Menu.Item position="right" >
              {/* The navbar will show these links after you log in */}
              <Button inverted as={Link} onClick={handleClick} to="/login">Log Out</Button>
              <Button inverted as={Link} to="/dashboard" style={{ marginLeft: '0.5em' }}><Icon name="cart" />Event Dashboard</Button>

              <Button inverted as={Link} to="/profile" style={{ marginLeft: '0.5em' }}><Icon name="user circle outline" />Profile</Button>

            </Menu.Item>
          :
            <Menu.Item position="right">
              {/* The navbar will show these links before you log in */}
              <Button inverted as={Link} to="/login">Log In</Button>
              <Button inverted as={Link} to="/signup" style={{ marginLeft: '0.5em' }}>Sign Up</Button>
            </Menu.Item>
            }
        </Menu>
      </Container>
      <Divider inverted />
    </Segment>
  )
}


const mapState = state => ({
  isLoggedIn: !!state.user.id,
  isHost: !!state.user.id && state.user.isHost,
})

const mapDispatch = dispatch => ({
  handleClick: () => {
    dispatch(logout())
    // browserHistory.push('/');
  },
});

export default connect(mapState, mapDispatch)(Navbar);
/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
