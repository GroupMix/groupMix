import React, { Component } from 'react'
import {
    List,
    Card,
    Header,
    Divider,
    Segment,
    Container,
    Icon,
    Button,
    Label
} from 'semantic-ui-react'
import '../styles/_playlistSong.scss'
import { connect } from 'react-redux'
import { voteForSong, getSimilarSongs } from '../store'

const PlaylistQueue = ({ songs, party, voteForSong, addSimilarSongs, userId, eventId }) => {

  const handleAdd = (evt, data, song) => {
    console.log('party', party)
    console.log('DATA', data)
    console.log('Song', song)
    addSimilarSongs(song, party, userId)
  }
    return (
        <Segment inverted>
            <List divided relaxed inverted className="playlistSong-Container">
                {
                    songs &&
                    songs.map((song, i) => {
                        return (
                            <List.Item key={song.id}>
                                <List.Content>
                                    <div className="playlistSong-Item" style={{ display: 'flex', alignItem: 'center', justifyContent: 'space-between' }}>
                                        <h3>
                                        <div style={{ display: 'flex', alignItem: 'center', flexDirection: 'column', width: 'max-content' }}>
                                            <Label circular color="black" size ="huge">{i + 1} -
                                            <span id="song-name">
                                            {
                                              (song.name.length >= 30)
                                              ? `${song.name.slice(0, 30).concat('...')}`
                                              : `${song.name}`
                                            }
                                            </span>
                                            </Label>
                                            <span id="song-artist" style={{marginLeft: '2em' }}> {`${song.artist}`}</span>
                                            </div>
                                        </h3>
                                        <div inverted style={{ width: '-webkit-fill-available', alignItems: 'center' }}>
                                        <Button
                                        size="medium"
                                        floated="right"
                                        color="purple"
                                        onClick={ (evt, data) =>  handleAdd(evt, data, song)
                                      }>
                                        Add Similar Songs
                                        </Button>

                                        <div id="vote-container">
                                            <Icon onClick={() => voteForSong('up', song.id, eventId)} name="caret up" size="big" style={{ color: '#AF5090', cursor: 'pointer' }} />
                                            <Icon onClick={() => voteForSong('down', song.id, eventId)} name="caret down" size="big" style={{ color: '#6A8CDF', cursor: 'pointer' }} />
                                        </div>
                                        </div>
                                    </div>
                                </List.Content>
                            </List.Item>
                        )
                    })
                }
            </List>
        </Segment>
    )
}
const mapState = state => ({})
const mapDispatch = dispatch => ({
    voteForSong(vote, songId, eventId) {
        dispatch(voteForSong(vote, songId, eventId))
    },
    addSimilarSongs(song, party, userId){
      console.log("dispatching")
      dispatch(getSimilarSongs(song, party, userId))
    }
})
export default connect(mapState, mapDispatch)(PlaylistQueue)
