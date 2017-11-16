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
        autoPlaySpeed: 200,
    }
    return (
        <Slider {...settings} className="sliderContainer">
            <div className="carouselItem">
                <div id="carouselTitle">
                    <h1>Hosting a Party?</h1>
                    <hr />
                    <h2>Get in the Mix!</h2>
                    <p>
                        Group Mix offers the perfect solution for entertainers music lovers and those who entertain.
                        Our service allows the host to create a perfect playlist based on the musical tastes of the guest!
                        Simply invite your guests, they'll choose their favorite music and our algorithm will take care of the rest!
                    </p>
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
