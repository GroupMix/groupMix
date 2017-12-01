import React, { Component } from 'react'
import '../styles/_videoStyles.scss'

const BackgroundVideo = () => {
    return (
        <div className="videoContainer">
            <div id="applicationDescription">
                <h1>Hosting a Party?</h1>
                <hr />
                <h2 style={{color: '#71C7FA'}}>Get in the Mix!</h2>
                <div id="welcomeMessage">
                    <p style={{alignSelf: 'center'}}>
                        Group Mix offers the perfect solution for entertainers music lovers and those who entertain.
                        Our service allows the host to create a perfect playlist based on the musical tastes of the guest!
                    </p>
                    <p>
                        Simply invite your guests to your event, they'll pick their favorite artists, and our application
                        will generate a playlist that everyone attending will enjoy!
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
