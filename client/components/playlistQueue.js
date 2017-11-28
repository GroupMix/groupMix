import React, { Component } from 'react'
import {
    List,
    Card,
    Header,
    Divider,
    Segment,
    Container,
    Icon
} from 'semantic-ui-react'
import '../styles/_playlistSong.scss'
import { connect } from 'react-redux'
import { voteForSong } from '../store'

const PlaylistQueue = ({ songs, eventId, voteForSong }) => {
    return (
        <Segment inverted>
            <List divided relaxed inverted className="playlistSong-Container">
                {
                    songs &&
                    songs.map((song, i) => {
                        return (
                            <List.Item key={song.id}>
                                <List.Content>
                                    <div className="playlistSong-Item" >
                                        <h3>
                                            {i + 1} -
                                            <span id="song-name">{`${song.name} `}</span>
                                            ~ by ~
                                            <span id="song-artist"> {` ${song.artist}`}</span>
                                            <span id="now-playing">{i === 0 ? '  ~ Now Playing' : ''}</span>
                                        </h3>
                                        <div id="vote-container">
                                            <Icon onClick={() => voteForSong('up', song.id, eventId)} name="caret up" size="big" style={{ color: '#6A8CDF', cursor: 'pointer' }} />
                                            <Icon onClick={() => voteForSong('down', song.id, eventId)} name="caret down" size="big" style={{ color: '#AF5090', cursor: 'pointer' }} />
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
    }
})
export default connect(mapState, mapDispatch)(PlaylistQueue)
