import React,{ Component } from 'react'
import {
    Segment
} from 'semantic-ui-react'
import Slider from 'react-slick'

const  Carousel = () => {
    const settings = {
        infinite: true,
        autoplay: true,
        autoPlaySpeed: 100,
    }
    return (
        <Slider {...settings}>
        <div></div>
        </Slider>
    )
}

export default Carousel
