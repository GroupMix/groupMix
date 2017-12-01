import React, { Component } from 'react'
import {
    Segment,
    Image
} from 'semantic-ui-react'
import Slider from 'react-slick'
import '../styles/_carousel.scss'

const Carousel = () => {
    const settings = {
        infinite: true,
        autoplay: true,
        autoPlaySpeed: 900,
    }
    return (
        <Slider {...settings} className="sliderContainer">
            <div className="carouselItem">
                <div id="carouselTitle">
                    <h1>Welcome to groupMix!</h1>
                    <hr />
                    <h3>~  Smart Playlists for Social Events  ~</h3>
                </div>
                <Image src='assets/Club Photo 1.jpeg' className="carouselImage" />
            </div>
            <div className="carouselItem" >
                <div id="carouselTitle">
                    <h1>Not Just For Parties!</h1>
                    <hr />
                    <p>
                        Our services could be applicable for any social gathering where a little music can brightend the mood.
                    </p>
                </div>
                <Image src='assets/Study Session.jpg' className="carouselImage" />
            </div>
            <div className="carouselItem">
                <div id="carouselTitle">
                    <h1>About Us</h1>
                    <hr />
                    <p>
                        Why would you want to know that?
                    </p>
                </div>
                <Image src='assets/Circular Equalizer.png' className="carouselImage" />
            </div>
        </Slider>
    )
}

export default Carousel;
