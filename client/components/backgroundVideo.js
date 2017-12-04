import React, { Component } from 'react'
import '../styles/_videoStyles.scss'

const BackgroundVideo = () => {
    return (
        <div className="videoContainer">
            <div id="applicationDescription">
                <h1>Welcome to groupMix!</h1>
                <hr />
                <h2 style={{color: '#71C7FA', font-style: 'italic'}}>A Collaborative Smart Playlist Generator For Events</h2>
                <div id="welcomeMessage">
                    <p style={{alignSelf: 'center'}}>
                        groupMix automatically creates a playlist that satisfies all of your guests' individual music tastes.
                    </p>
                    <p>
                        Create an event and invite your friends. Choose your favorite artists. Then let us take care of the rest!
                    </p>
                    <h2 style={{alignSelf:'center'}}>
                        To get started, <span style={{color: '#71C7FA'}}>Log in and start a new event!</span>
                    </h2>
                </div>
            </div>
            <video autoPlay mute loop className="video">
                <source src="assets/partyVideo.mp4" type="video/mp4" />
            </video>
        </div>
    )
}

export default BackgroundVideo
