import React, { Component } from 'react'
import {
    Container,
    Image,
    Segment,

} from 'semantic-ui-react'
import Slick from 'react-slick'
import Carousel from './_landingCarousel'

const LandingPage = (props) => {
    return (
        <Container fluid className="landingPageContainer">
            <Carousel />
        </Container>
    )
}

export default LandingPage
