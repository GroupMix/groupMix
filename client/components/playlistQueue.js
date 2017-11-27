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
const PlaylistQueue = ({ songs }) => {
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
                                            {i+1} -
                                            <span id="song-name">{`${song.name} `}</span>
                                            ~ by ~
                                            <span id="song-artist"> {` ${song.artist}`}</span>
                                        </h3>
                                        <div id="vote-container">
                                            <Icon onClick={() => console.log('UpVote')} name="caret up" size="big" style={{ color: '#6A8CDF', cursor: 'pointer' }} />
                                            <Icon onClick={() => console.log('DownVote')} name="caret down" size="big" style={{ color: '#AF5090', cursor: 'pointer' }} />
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

export default PlaylistQueue
