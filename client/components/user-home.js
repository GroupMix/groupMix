import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
var SpotifyWebApi = require('spotify-web-api-js');
// import * as SpotifyWebApi from 'spotify-web-api-js'
var spotifyApi = new SpotifyWebApi();
import { Button, Form, Grid, Header, Segment, Icon, List } from 'semantic-ui-react'
import addSongsThunk from '../store'
/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      recent: [],
      top: [],
      artists: [],
      selected: []
    }
    this.handleAdd = this.handleAdd.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
componentDidMount(){
  // console.log('mounting')
  spotifyApi.setAccessToken(this.props.user.access)
  let recent;
  let top;
  let artists;
  spotifyApi.getMyRecentlyPlayedTracks((err, data) => {
    recent = data;
    if (err) console.log(err)
    else {
      this.setState({recent: recent.items})
    }
  })

  spotifyApi.getMyTopTracks((err, data) => {
    top = data;
    if (err) console.log(err)
    else {
      // console.log('top', top)
      this.setState({top: top.items})
    }
  })

  spotifyApi.getMyTopArtists((err, data) => {
    artists = data;
    if (err) console.log(err)
    else {
      // console.log('artists', artists)
      this.setState({artists: artists.items})

    }
  })

}

handleAdd(evt, data){
  // console.log('evt', evt)
  // console.log('data', data)
  this.setState({selected: [data.content, ...this.state.selected]})
  console.log('SELECTEDDDD', this.state.selected)
}
handleSubmit(){
  // console.log('evt', evt)
  // console.log('data', data)
  let songs = [];
  console.log('handlesubmit', this.state.selected)
  this.state.selected.map(artist =>
 spotifyApi.getArtistTopTracks(artist.id, 'US', (err, data) => {
  if (err) console.log(err)
  else {
    console.log(data)
    songs = [...songs, ...this.state.recent, ...this.state.top, ...data.items]

    this.props.userSongs(songs)
  }
 })
  )
}
  render(){
  const { email, user } = this.props
  console.log('select render', this.state.selected)

  // console.log('recent', this.state.recent)

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <Grid
        divided
        textAlign="left"
        columns={2}

        // verticalAlign="left"
      >
        <Grid.Column  >
        <Header as="h2" color="blue" textAlign="center">
        Event Name
        </Header>
        </Grid.Column>

        <Grid.Column  >
          <Header as="h2" color="blue" textAlign="center">
            Top Artists
            <Button onClick={this.handleSubmit} color="blue" floated="right">
            Submit Artists
            </Button>
          </Header>
          <List >
          {this.state.artists &&
            this.state.artists.map(item => {
              return (
           <List.Item key = {item.id}>
            <List.Content floated="right">
              <Button onClick={this.handleAdd} color="purple" disabled = {this.state.selected.includes(item)} content={item}>
             <Icon name="add" color="white" />
              Add
              </Button>
            </List.Content>
            <Icon name= "music" color="blue" />
            <List.Content>
              {item.name}
            </List.Content>
          </List.Item>)})
          }
          </List>
        </Grid.Column>
      </Grid>
    </div>
  )
}
}
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
    email: state.user.user.email
  }
}

const mapDispatch = (dispatch) => {
  return {
    userSongs (songs) {
      dispatch(addSongsThunk(songs))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
