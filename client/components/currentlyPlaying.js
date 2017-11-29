import React from 'react'
import {
    Container,
    Header,
    Segment,
    Icon

} from 'semantic-ui-react'
import '../styles/_logo.scss'

const nowPlayingContainer = {
    display: 'flex',
    flexDirection: 'row'
}
const CurrentlyPlaying = ({ currentSong }) => {
    const { artist, name } = currentSong

    return (
        <Segment inverted>
            {
                currentSong.name &&
                <div>
                    <h3>Now Playing:</h3>
                    <div style={nowPlayingContainer}>
                        <Icon name="music" size="huge" color="violet" className="heartbeat" />
                        <div>
                            <h2 style={{ color: '#6F8CD9' }}>{name}</h2>
                            <p style={{ color: '#A3568D' }}>{artist}</p>
                        </div>
                    </div>
                </div>
            }
        </Segment>
    )
}

export default CurrentlyPlaying
