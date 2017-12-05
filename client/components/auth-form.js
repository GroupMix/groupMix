import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import { Button, Form, Grid, Header, Segment, Icon, Message } from 'semantic-ui-react'
/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit} = props

  return (
    <div className="login-form">
    <Grid
      textAlign="center"
      style={{ height: '90vh', width: 'auto', margin:'auto'}}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="green" textAlign="center">
          Please {displayName}
        </Header>
        <Message positive>
        <Message.Header>{displayName} with Spotify to start mixin</Message.Header>
        <p>You <b>must</b> have a spotify account to enjoy groupMix.</p>
      </Message>
            <Button href="/auth/spotify" color="green" fluid size="large">
            <Icon name="spotify" size="large" color="white" />
              Spotify {displayName}
            </Button>

      </Grid.Column>
    </Grid>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
