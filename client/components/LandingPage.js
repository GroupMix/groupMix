import React,{ Component } from 'react'
import {
    Container,
    Image,

} from 'semantic-ui-react'
import Slick from 'react-slick'
import Carousel from './_landingCarousel'

const LandingPage = (props) => {
    return (
        <Container fluid>
            <Carousel />
        </Container>
    )
}

export default LandingPage
