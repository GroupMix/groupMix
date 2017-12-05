import React, { Component } from 'react'
import {
    Container,
    Image,
    Segment,

} from 'semantic-ui-react'
import BackgroundVideo from './backgroundVideo'

const LandingPage = (props) => {
    return (
        <Container fluid className="landingPageContainer">
            <BackgroundVideo />
        </Container>
    )
}

export default LandingPage
