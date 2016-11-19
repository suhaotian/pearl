import React, { Component } from 'react'
import Slider from 'react-slick'
import styles from './banner.css'

import Item from './item'

export default class Banner extends Component {

  slideSettings = {
    className: styles.slideWrap,
    infinite: true,
    speed: 600,
    arrows: false,
    centerMode: true,
    centerPadding: 0,
    slidesToShow: 1,    
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    // responsive: [{
    //   breakpoint: 480,
    //   settings: {
    //     dots: true
    //   }
    // }]
  }

  render() {
    return (
      <div className={styles.wrap}>
        <Slider {...this.slideSettings}>
          {
            this.data.map((item, i) => (
              <div key={i} className={styles.card}>
                <Item{...item}/>
              </div>
            ))
          }
        </Slider>
      </div>
    )
  }

  // Will replace by mock data, like:
  // fetch(xx).then((data) => {setState({data}))
  data = [
    {
      img: require('./img1@2x.jpg'),
      desc: 'Celebrate Shanghai Oyster',
    },
    {
      img: require('./img2@2x.jpg'),
      desc: 'Celebrate Shanghai Oyster',
    },    
  ]

}