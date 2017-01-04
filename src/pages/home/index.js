import React, { Component } from 'react'
import ResponsiveImage from 'components/ResponsiveImage'
import Link from 'react-router/Link'
import Slider from 'react-slick'
import StaticComponent from 'components/StaticComponent'
import NavBar from '../common/NavBar'
import {GlobalLoading} from 'components/Loading'
import styles from './style.css'

import {m} from 'api/moltin'

window.m = m

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
  {
    id: 3,
    title: 'lobsters',
    img: require('resources/images/lobster.png'),
  },
]

class Home extends Component {
  
  state = {
    height: 'auto',
    fetching: true,
    data: data,
    error: null,
  }

  componentDidMount() {
    m('Category.List', null)
      .then(category => {
        if (this.willUnmout) return
        this.event = "orientationchange" in window ? "orientationchange":"resize"
        window.addEventListener(this.event, this.handleResize)

        this.setState({
          fetching: false,
          height: window.innerHeight > window.innerWidth ? window.innerHeight : (768/0.8),
          data: category.map((item, i) => {
            const data = this.state.data
            data[i].id = item.id
            data[i].title = item.title
            return data[i]  
          })
        })
      })
      .catch(e => {
        if (this.willUnmout) return
        this.setState({
          fetching: false,
          error: e.error || e.message || JSON.stringify(e)
        })
      })
  }

  componentWillUnmount() {
    this.willUnmout = true
    window.removeEventListener(this.event, this.handleResize)
  }

  handleResize = () => {
    this.setState({height: window.innerHeight > window.innerWidth ? window.innerHeight : (768/0.8),})
  }

  // componentWillReceiveProps(nextProps) {}
  
  render() {

    if (this.state.fetching) return <GlobalLoading />
    if (this.state.error) return <div>{this.state.error}</div>
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      arrows: false,
      className: styles.sliderWrap,
      slidesToScroll: 1,
    }

    return (
      <div style={{height: this.state.height}}>
        <NavBar
          title={"Pearl"}
          cart={false}
          back={false}
        />
        <Slider {...settings}>
          {
            data.map((item, i) => (
              <div key={i}>
                <StaticComponent className={styles.inner}>
                  <div className={styles.heading}>{item.title}s</div>
                  <div className={styles.imgWrap}>
                    <ResponsiveImage src={item.img} ratio="69.1%" />
                  </div>
                  <div>
                    <Link to={`/list/${item.id}`} className={styles.btn}>See stock</Link>
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