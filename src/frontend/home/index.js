import React, { Component } from 'react'
import Header from '../common/header'
import Banner from './banner'
import List from './list'
import News from './news'
import Footer from '../common/footer'

export default class Home extends Component {

  render() {
    return (
      <div>
        <Header />
        <Banner />
        <List />
        <News />
        <Footer />
      </div>
    )
  }

}