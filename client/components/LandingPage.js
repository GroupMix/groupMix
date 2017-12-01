import React, { Component } from 'react'
import {
    Container,
    Image,
    Segment,
    Header,
    Message

} from 'semantic-ui-react'
import Slick from 'react-slick'
import Carousel from './_landingCarousel'
import '../styles/_video.scss'
import '../styles/_carousel.scss'

const LandingPage = (props) => {
    return (
        <Container fluid className="videoDiv" >
        <div id="carouselTitle">
        <Header as="h1" inverted   > Hosting a Party?
        <Header.Subheader inverted> Get in the Mix! </Header.Subheader>
        </Header>
        <Message inverted   style={{ backgroundColor: 'rgba(150, 58, 158, 0.8)'}}>
        <p> Group Mix offers the perfect solution for entertainers music lovers and those who entertain.
        Our service allows the host to create a perfect playlist based on the musical tastes of the guest!
        Simply invite your guests, they'll choose their favorite music and our algorithm will take care of the rest! </p>
        </Message>
        </div>
        <video preload id="video" autoPlay loop style={{ height: '-webkit-fill-available' }}>
        <source src="party.mp4" type="video/mp4" />
        </video>
        </Container>
    )
}

export default LandingPage
