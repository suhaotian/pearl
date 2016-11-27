import React, { Component } from 'react'
import ResponsiveImage from 'components/ResponsiveImage'
import Link from 'react-router/Link'
import Slider from 'react-slick'
import StaticComponent from 'components/StaticComponent'
import styles from './style.css'

class Home extends Component {
  
  state = {
    height: 'auto'
  }

  componentDidMount() {
    this.setState({
      height: window.innerHeight
    })
  }

  // componentWillUnmount() {}

  // componentWillReceiveProps(nextProps) {}
  
  render() {
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      arrows: false,
      className: styles.sliderWrap,
      dotsClass: styles.dot,
      slidesToScroll: 1,
    }

    let data = [
      {
        id: 0,
        title: 'oysters',
        img: require('resources/images/oyster.png'),
      },
      {
        id: 1,
        title: 'mussels',
        img: require('resources/images/mussel.png'),
      },
      {
        id: 2,
        title: 'crabs',
        img: require('resources/images/crab.png'),
      },
    ]
    return (
      <div style={{height: this.state.height}}>
        <div className={styles.title}>Pearl</div>
        <Slider {...settings}>
          {
            data.map((item, i) => (
              <div key={i}>
                <StaticComponent className={styles.inner}>
                  <div className={styles.heading}>{item.title}</div>
                  <div className={styles.imgWrap}>
                    <ResponsiveImage src={item.img} ratio="69.1%" />
                  </div>
                  <div>
                    <Link to="/list" className={styles.btn}>See stock</Link>
                  </div>
                </StaticComponent>
              </div>
            ))
          }
        </Slider>
      </div>
    )
  }
}

Home.defaultProps = {}

Home.propTypes = {}

export default Home