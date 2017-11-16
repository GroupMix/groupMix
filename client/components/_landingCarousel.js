import React,{ Component } from 'react'
import {
    Segment,
    Image
} from 'semantic-ui-react'
import Slider from 'react-slick'
import '../styles/_carousel.scss'

const  Carousel = () => {
    const settings = {
        infinite: true,
        autoplay: true,
        autoPlaySpeed: 100,
    }
    return (
        <Slider {...settings} className="sliderContainer">
        <div className="carouselItem">
            <div id="carouselTitle">
                <h1>Get in the Mix</h1>
                <hr/>
                <p>Ex deserunt ipsum minim exercitation ut. Esse aute consequat velit nostrud exercitation occaecat in aliquip. Voluptate proident et et eu deserunt anim incididunt magna ea eu.

Sunt tempor sunt esse exercitation ullamco eiusmod laborum excepteur adipisicing voluptate laboris. Nisi laboris enim ad cupidatat sint exercitation. Laboris labore ut ut incididunt. Incididunt et id enim fugiat in. Et commodo amet veniam consectetur reprehenderit dolore tempor excepteur eiusmod elit aute adipisicing ea irure. Deserunt non sint dolor Lorem officia ullamco laboris aliqua. Id do dolore consectetur eu magna qui ipsum.

Occaecat quis occaecat amet ullamco cupidatat tempor. Ex sunt mollit labore non cillum non ea eu tempor irure. Ullamco excepteur ut anim amet esse. Dolor ut consectetur labore sint mollit ut. Anim eiusmod voluptate occaecat magna sint nisi ut duis ut irure aliquip proident deserunt. </p>
            </div>
            <Image src='assets/Circular Equalizer.png' className="carouselImage" />
        </div>
        </Slider>
    )
}

export default Carousel;
