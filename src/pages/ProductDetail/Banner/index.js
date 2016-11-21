import React, { Component } from 'react'
import ResponsiveImage from 'components/ResponsiveImage'
import Slider from 'react-slick'
import styles from './style.css'

export default class Banner extends Component {

  render() {
    return (
      <div>
        <ResponsiveImage 
          ratio="66.67%" 
          src={require('./banner.jpg')}
        />
      </div>
    )
  }
}